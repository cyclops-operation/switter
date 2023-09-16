"use client"

import { MonsterInfo } from "@/interface/monster"
import { useQuery } from "@tanstack/react-query"

import MonsterImage from "./common/monster-image"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

/** 1차 데이터 정제를 위한 컴포넌트 */
export default function MonsterDialog() {
  const { data: monsterList } = useQuery<MonsterInfo[]>({
    queryKey: ["monster"],
    queryFn: () => fetch("/api/monster").then((res) => res.json()),
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Monster List(Sample)</Button>
      </DialogTrigger>

      <DialogContent className="w-[650px]">
        <div className="grid max-h-[300px] grid-cols-8 gap-[16px] overflow-y-auto pt-[16px] sm:grid-cols-6 md:grid-cols-6">
          {monsterList?.map((monsterInfo) => (
            <MonsterImage key={monsterInfo.id} monsterInfo={monsterInfo} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
