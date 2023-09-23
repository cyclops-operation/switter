"use client"

import { useState } from "react"

import clsx from "clsx"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

const FeedDetailItem = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <li
      className={clsx(
        "flex min-h-[100px] cursor-pointer items-center justify-center rounded-lg border max-lg:w-full bg-background transition-all shadow-sm",
        {
          "absolute left-0 top-0 right-0 bottom-0 w-full": isOpen,
          "w-[calc(50%-2px)] ": !isOpen,
        }
      )}
      onClick={handleClick}
    >
      Detail List
    </li>
  )
}

export default function FeedList() {
  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex gap-2">
        <ScrollArea className="max-h-[600px] w-full max-w-[300px] grow-0 border-r">
          <ul className="flex flex-col gap-2">
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
            <li className="flex min-h-[100px] items-center justify-center rounded-lg transition-colors duration-300 hover:bg-slate-200">
              List 1
            </li>
          </ul>
        </ScrollArea>

        <ScrollArea className="relative max-h-[600px] flex-1">
          <div className="dark: sticky left-0 top-0 flex items-center gap-2 border-b bg-background p-2">
            <Label htmlFor="attack-search" className="cursor-pointer">
              공덱 검색
            </Label>

            <Input
              id="attack-search"
              className="flex-1"
              placeholder="공격 몬스터를 검색해주세요."
            />
          </div>

          <ul className="flex flex-wrap gap-1 rounded-lg p-2">
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
            <FeedDetailItem />
          </ul>
        </ScrollArea>
      </div>
    </div>
  )
}
