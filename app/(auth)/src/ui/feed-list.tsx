"use client"

import { useState } from "react"
import Image from "next/image"

import clsx from "clsx"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toggle } from "@/components/ui/toggle"

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
    <div className="sticky left-0 top-[88px] z-50 flex flex-col gap-2 bg-background">
      <p className="px-2">총 N건의 리스트</p>

      <div className="flex gap-2 rounded-lg border p-2 shadow-sm">
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
            <div className="flex-1">
              <Input
                id="attack-search"
                className="flex-1"
                placeholder="공격 몬스터를 검색해주세요."
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Toggle
                  size="sm"
                  onPressedChange={(value) => console.log(value)}
                >
                  <Image
                    src="/images/img_elements_fire.png"
                    alt="Fire"
                    width={16}
                    height={16}
                  />
                </Toggle>
                <Toggle size="sm">
                  <Image
                    src="/images/img_elements_water.png"
                    alt="Fire"
                    width={16}
                    height={16}
                  />
                </Toggle>
                <Toggle size="sm">
                  <Image
                    src="/images/img_elements_wind.png"
                    alt="Fire"
                    width={16}
                    height={16}
                  />
                </Toggle>
                <Toggle size="sm">
                  <Image
                    src="/images/img_elements_light.png"
                    alt="Fire"
                    width={16}
                    height={16}
                  />
                </Toggle>
                <Toggle size="sm">
                  <Image
                    src="/images/img_elements_dark.png"
                    alt="Fire"
                    width={16}
                    height={16}
                  />
                </Toggle>
              </div>
            </div>
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
