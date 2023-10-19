"use client"

import { ChangeEvent, ReactNode } from "react"

import useDebounceState from "@/hook/useDebounceState"
import { MonsterInfo } from "@/interface/monster"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loading from "@/components/common/loading"

import useMonsterList from "../../hooks/useMonsterList"

interface MonsterDialogProps {
  selectedMonster: ReactNode
  /** 검색한 몬스터 정보를 다양한 UI로 노출시키기 위해 render props 사용 */
  renderSearchedMonster?: (monsterInfo: MonsterInfo[]) => ReactNode
}

export default function MonsterSearchDialog({
  selectedMonster,
  renderSearchedMonster,
}: MonsterDialogProps) {
  const [searchTerm, setSearchTerm] = useDebounceState("")

  const { isLoading, data: monsterList } = useMonsterList({
    searchTerm,
    page: 1,
    limit: 18,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: searchTerm } = e.target
    setSearchTerm(searchTerm)
  }

  const isVisibleSearchedMonster =
    Boolean(monsterList?.total) && typeof renderSearchedMonster === "function"

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

        {isLoading ? (
          <Loading className="h-[212px]" />
        ) : (
          <>
            {isVisibleSearchedMonster ? (
              <>
                <div className="flex max-h-[300px] flex-wrap items-center gap-4 overflow-y-auto overflow-x-hidden">
                  {renderSearchedMonster(monsterList?.list ?? [])}
                </div>
                {selectedMonster}
              </>
            ) : (
              <>
                {searchTerm && (
                  <FormDescription>검색 결과가 없습니다.</FormDescription>
                )}
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
