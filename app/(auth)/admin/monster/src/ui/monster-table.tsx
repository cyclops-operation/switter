"use client"

import { ChangeEvent, useState } from "react"

import useDebounceState from "@/hook/useDebounceState"
import { MonsterInfo, monsterElement } from "@/interface/monster"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { getDynamicRoute } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/common/icons"
import Loading from "@/components/common/loading"
import Pagination from "@/components/common/pagination"
import Tag from "@/components/common/tag"
import useMonsterList from "@/app/(auth)/src/hooks/useMonsterList"
import DeleteDialog from "@/app/(auth)/src/ui/dialog/delete-dialog"
import MonsterManageDialog from "@/app/(auth)/src/ui/dialog/monster-manage-dialog"

const elementIcon = {
  [monsterElement.Enum.dark]: Icons.moon,
  [monsterElement.Enum.light]: Icons.sun,
  [monsterElement.Enum.water]: Icons.droplet,
  [monsterElement.Enum.wind]: Icons.wind,
  [monsterElement.Enum.fire]: Icons.flame,
}

const MonsterTable = () => {
  const [page, setPage] = useState(1)

  const [searchTerm, setSearchTerm] = useDebounceState("")

  const queryClient = useQueryClient()

  const { data: monsterList, isLoading } = useMonsterList({ searchTerm, page })

  const { toast } = useToast()

  const { mutate: editMonster } = useMutation(
    async (payload: MonsterInfo) =>
      await axios.patch<MonsterInfo>(apiRoute.Monster, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([apiRoute.Monster], {
          exact: false,
        })
        toast({ title: "몬스터가 수정되었습니다." })
      },
    }
  )

  const { mutate: deleteMonster } = useMutation(
    async (id: number | undefined) =>
      await axios.delete(
        getDynamicRoute(apiRoute.Monster, {
          query: {
            id,
          },
        })
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([apiRoute.Monster], {
          exact: false,
        })
        toast({ title: "몬스터가 삭제되었습니다." })
      },
    }
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: searchTerm } = e.target
    setSearchTerm(searchTerm)
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        defaultValue={searchTerm}
        placeholder="원어명 혹은 한글명을 통해 검색해주세요."
        onChange={handleChange}
      />

      {isLoading ? (
        <Loading className="h-[577.5px]" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">원어명</TableHead>
              <TableHead className="w-[250px]">한글명</TableHead>
              <TableHead className="w-[200px]">속성</TableHead>
              <TableHead>키워드</TableHead>
              <TableHead className="w-[80px]">수정</TableHead>

              <TableHead className="w-[80px]">삭제</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monsterList?.list.map((monster) => {
              const { id, originName, monsterName, elementType, keyword } =
                monster
              const IconComponent = elementType
                ? elementIcon[elementType]
                : null

              return (
                <TableRow key={id}>
                  <TableCell>{originName}</TableCell>
                  <TableCell>{monsterName}</TableCell>
                  <TableCell>
                    {IconComponent ? <IconComponent size={20} /> : "-"}
                  </TableCell>
                  <TableCell className="space-x-2">
                    {keyword.map(
                      (item) =>
                        item && (
                          <Tag key={item} size="sm">
                            {item}
                          </Tag>
                        )
                    )}
                  </TableCell>

                  <MonsterManageDialog
                    title="몬스터 수정하기"
                    onSubmit={(value) => editMonster({ ...value, id })}
                    initValue={monster}
                  >
                    <TableCell>
                      <Button size="icon-sm" variant="ghost">
                        <Icons.fileEdit size={16} />
                      </Button>
                    </TableCell>
                  </MonsterManageDialog>

                  <TableCell>
                    <DeleteDialog
                      title="정말 삭제하시겠습니까?"
                      description="몬스터를 삭제하시면 다시 복구할 수 없습니다."
                      onDelete={() => deleteMonster(id)}
                    >
                      <Button size="icon-sm" variant="ghost">
                        <Icons.trash size={16} />
                      </Button>
                    </DeleteDialog>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

      <Pagination
        current={page}
        total={Math.ceil((monsterList?.total ?? 0) / 10)}
        onPage={setPage}
      />
    </div>
  )
}

export default MonsterTable
