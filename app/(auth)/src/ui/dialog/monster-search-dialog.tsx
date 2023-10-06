"use client"

import { ChangeEvent, ReactNode, useMemo, useState } from "react"

import { MonsterInfo } from "@/interface/monster"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { debounce } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MonsterDialogProps {
  /** 검색한 몬스터 정보를 다양한 UI로 노출시키기 위해 render props 사용 */
  renderSearchedMonster?: (monsterInfo: MonsterInfo[]) => ReactNode
}

export default function MonsterSearchDialog({
  renderSearchedMonster,
}: MonsterDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const { data: monsterList } = useQuery<MonsterInfo[]>(
    [apiRoute.Monster],
    async () => {
      return await axios.get(apiRoute.Monster).then((res) => res.data)
    }
  )

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
