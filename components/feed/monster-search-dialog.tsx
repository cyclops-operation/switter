"use client"

import { ChangeEvent, ReactNode, useMemo, useState } from "react"

import { MonsterInfo } from "@/interface/monster"
import { useQuery } from "@tanstack/react-query"

import { apiRoute } from "@/lib/api-route"
import { debounce } from "@/lib/utils"

import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { FormDescription } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface MonsterDialogProps {
  /** 검색한 몬스터 정보를 다양한 UI로 노출시키기 위해 render props 사용 */
  renderSearchedMonster?: (monsterInfo: MonsterInfo[]) => ReactNode
}

/** 몬스터를 검색하는 Dialog */
export default function MonsterSearchDialog({
  renderSearchedMonster,
}: MonsterDialogProps) {
  const { data: monsterList } = useQuery<MonsterInfo[]>({
    queryKey: [apiRoute.Monster],
    queryFn: () => fetch(apiRoute.Monster).then((res) => res.json()),
  })

  const [searchTerm, setSearchTerm] = useState("")

  const debounceSearchTerm = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm)
  }, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: searchTerm } = e.target

    debounceSearchTerm(searchTerm)
  }

  const searchedMonsterList = useMemo(() => {
    if (!searchTerm || !monsterList?.length) return []

    return monsterList?.filter((monsterInfo) => {
      return (
        monsterInfo.originName
          .toLocaleLowerCase()
          .indexOf(searchTerm.toLocaleLowerCase()) !== -1 ||
        monsterInfo.monsterName?.indexOf(searchTerm) !== -1 ||
        monsterInfo.keyword.some((word) => word.indexOf(searchTerm) !== -1)
      )
    })
  }, [monsterList, searchTerm])

  const isVisibleSearchedMonster =
    Boolean(searchedMonsterList.length) &&
    typeof renderSearchedMonster === "function"

  return (
    <Dialog
      onOpenChange={(isDialogOpen) => {
        if (isDialogOpen) return

        setSearchTerm("")
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          몬스터 검색
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <div>
          <Label htmlFor="search">검색</Label>

          <Input
            className="mt-2"
            id="search"
            placeholder="몬스터를 검색해주세요."
            defaultValue={searchTerm}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        {isVisibleSearchedMonster ? (
          <div className="flex max-h-[300px] flex-wrap items-center gap-4 overflow-y-auto overflow-x-hidden">
            {renderSearchedMonster(searchedMonsterList)}
          </div>
        ) : (
          <>
            {searchTerm && (
              <FormDescription>검색 결과가 없습니다.</FormDescription>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
