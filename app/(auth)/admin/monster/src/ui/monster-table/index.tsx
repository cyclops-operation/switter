"use client"

import { ChangeEvent, useState } from "react"

import useDebounceState from "@/hook/useDebounceState"
import { monsterElement } from "@/interface/monster"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Icons } from "@/components/common/icons"
import Loading from "@/components/common/loading"
import Pagination from "@/components/common/pagination"
import useMonsterList from "@/app/(auth)/src/hooks/useMonsterList"

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

  const { data: monsterList, isLoading } = useMonsterList({ searchTerm, page })

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {monsterList?.map(
              ({ id, originName, monsterName, elementType, keyword }) => {
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
                    <TableCell>{keyword}</TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      )}

      <Pagination current={page} total={5} onPage={setPage} />
    </div>
  )
}

export default MonsterTable
