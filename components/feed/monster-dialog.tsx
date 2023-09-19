"use client"

import { ChangeEvent, useState } from "react"

import { MonsterInfo } from "@/interface/monster"
import { useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"

import { debounce } from "@/lib/utils"

import MonsterImage from "../common/monster-image"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { MonsterFieldArray } from "./feed-dialog"

interface MonsterDialogProps {
  onSelect: MonsterFieldArray
}

export default function MonsterDialog({ onSelect }: MonsterDialogProps) {
  const { data: monsterList } = useQuery<MonsterInfo[]>({
    queryKey: ["monster"],
    queryFn: () => fetch("/api/monster").then((res) => res.json()),
  })

  const [searchTerm, setSearchTerm] = useState("")

  const debounceSearchTerm = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm)
  }, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: searchTerm } = e.target

    debounceSearchTerm(searchTerm)
  }

  const handleMonsterSelect = (monster: MonsterInfo) => {
    setSearchTerm("")
    onSelect(monster)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          몬스터 검색
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[650px]">
        <div className="pt-[20px]">
          <Label htmlFor="search">검색</Label>

          <Input
            className="mt-[8px]"
            id="search"
            placeholder="저장한 검색어 테스트 (ex. 마궁 > 마법궁사)"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <AnimatePresence>
          <motion.div
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="grid max-h-[300px] grid-cols-8 gap-[16px] overflow-y-auto pt-[16px] sm:grid-cols-6 md:grid-cols-6"
          >
            {monsterList?.map((monsterInfo) => {
              if (searchTerm) {
                const isMatchSearchTerm =
                  monsterInfo.originName
                    .toLocaleLowerCase()
                    .indexOf(searchTerm.toLocaleLowerCase()) !== -1 ||
                  monsterInfo.monsterName?.indexOf(searchTerm) !== -1 ||
                  monsterInfo.keyword.some(
                    (word) => word.indexOf(searchTerm) !== -1
                  )

                return isMatchSearchTerm ? (
                  <MonsterImage
                    key={monsterInfo.id}
                    monsterInfo={monsterInfo}
                    onSelect={handleMonsterSelect}
                  />
                ) : null
              }

              return (
                <MonsterImage
                  key={monsterInfo.id}
                  monsterInfo={monsterInfo}
                  onSelect={handleMonsterSelect}
                />
              )
            })}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
