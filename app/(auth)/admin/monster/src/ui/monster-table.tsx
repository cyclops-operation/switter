"use client"

import { ChangeEvent, useEffect, useState } from "react"

import useDebounceState from "@/hook/useDebounceState"
import { MonsterElement, MonsterInfo } from "@/interface/monster"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import clsx from "clsx"

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

const ElementIcon = ({ elementType }: { elementType: MonsterElement }) => {
  return <i className={clsx("monster-elements inline-block", elementType)} />
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

  useEffect(() => {
    if (typeof searchTerm === "string") {
      setPage(1)
    }
  }, [searchTerm])

  return (
    <div className="flex flex-col gap-4">
      <Input
        defaultValue={searchTerm}
        placeholder="원어명, 한글명 혹은 키워드를 통해 검색해주세요."
        onChange={handleChange}
      />

      {isLoading ? (
        <Loading className="h-[657.5px]" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[72px]">원어명</TableHead>
              <TableHead className="min-w-[100px]">한글명</TableHead>
              <TableHead className="min-w-[64px]">속성</TableHead>
              <TableHead className="min-w-[280px]">키워드</TableHead>
              <TableHead className="min-w-[64px]">수정</TableHead>

              <TableHead className="min-w-[64px]">삭제</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monsterList?.list.map((monster) => {
              const { id, originName, monsterName, elementType, keyword } =
                monster

              return (
                <TableRow key={id} className="h-[61px]">
                  <TableCell>{originName}</TableCell>
                  <TableCell>{monsterName}</TableCell>
                  <TableCell>
                    {elementType ? (
                      <ElementIcon elementType={elementType} />
                    ) : (
                      "속성 없음"
                    )}
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
