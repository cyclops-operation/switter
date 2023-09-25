"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { MonsterInfo } from "@/interface/monster"
import { DialogClose } from "@radix-ui/react-dialog"
import clsx from "clsx"

import { pageRoute } from "@/lib/page-route"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/common/icons"
import MonsterImage from "@/components/common/monster-image"

import useCommentDelete from "../../hooks/useCommentDelete"
import useCommentList from "../../hooks/useCommentList"
import useFeedList from "../../hooks/useFeedList"
import CommentDialog from "../dialog/comment-dialog"

interface FeedDetailItem {
  monsterList: MonsterInfo[]
}

const FeedDetailItem = ({ monsterList }: FeedDetailItem) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <li
      className={clsx(
        "flex min-h-[100px] cursor-pointer items-center justify-center rounded-lg border max-lg:w-full bg-background transition-shadow shadow-sm hover:shadow-md",
        {
          "absolute left-0 top-0 right-0 bottom-0 w-full": isOpen,
          "w-[calc(50%-2px)]": !isOpen,
        }
      )}
      onClick={handleClick}
    >
      {monsterList.map((monsterInfo) => (
        <MonsterImage monsterInfo={monsterInfo} />
      ))}
    </li>
  )
}

export default function FeedList() {
  const { push: routerPush } = useRouter()

  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const { feedList } = useFeedList()

  const { commentList } = useCommentList()

  const { deleteFeed } = useCommentDelete()

  const handleSelect = (feedId: number) => {
    routerPush(pageRoute.FeedDetail(String(feedId)))
  }

  const handlePrev = () => {
    routerPush(pageRoute.Feed)
  }

  const handleFeedDelete = () => {
    deleteFeed().then(handlePrev)
  }

  return (
    <div className="sticky left-0 top-[88px] z-50 flex flex-col gap-2 bg-background">
      <p className="select-none px-2">{`총 ${feedList.length}건`}</p>

      <div className="flex min-h-[500px] gap-2 rounded-lg border p-2 shadow-sm">
        {feedList.length ? (
          <ScrollArea className="max-h-[600px] w-full max-w-[250px] border-r pr-2">
            <ul className="flex flex-col gap-2">
              {feedList.map(({ id, monsterList }) => {
                const defenseMonsterList = monsterList as MonsterInfo[]

                return (
                  <li
                    key={id}
                    className={clsx(
                      "flex min-h-[100px] cursor-pointer items-center justify-center rounded-lg transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      {
                        "bg-zinc-100 dark:bg-zinc-800": feedId === String(id),
                      }
                    )}
                    onClick={() => handleSelect(id)}
                  >
                    <div className="flex gap-2">
                      {defenseMonsterList.map((monsterInfo) => (
                        <MonsterImage
                          key={monsterInfo.id}
                          monsterInfo={monsterInfo}
                        />
                      ))}
                    </div>
                  </li>
                )
              })}
            </ul>
          </ScrollArea>
        ) : (
          <p className="flex flex-1 select-none items-center justify-center text-sm text-slate-300">
            방어덱을 추가해주세요.
          </p>
        )}

        {Boolean(true) ? (
          <div className="relative flex-1">
            <div className="flex w-full flex-1 justify-between">
              <Button
                size="icon"
                variant="ghost"
                onClick={handlePrev}
                title="뒤로가기"
              >
                <Icons.prev size={20} />
                <span className="sr-only">뒤로가기</span>
              </Button>

              <div className="flex">
                <CommentDialog />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" title="방덱 삭제">
                      <Icons.trash size={20} />
                      <span className="sr-only">방덱 삭제</span>
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <p className="font-medium">이 방어덱을 삭제하시겠어요?</p>

                    <DialogDescription>
                      모든 공덱도 함께 삭제됩니다.
                    </DialogDescription>

                    <DialogFooter>
                      <Button variant="destructive" onClick={handleFeedDelete}>
                        삭제
                      </Button>

                      <Button variant="outline">
                        <DialogClose>닫기</DialogClose>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Separator className="mt-2" />

            {commentList?.length ? (
              <ScrollArea className="max-h-[600px] flex-1">
                <ul className="flex flex-wrap gap-1 rounded-lg p-2">
                  {commentList.map(({ id, monsterList }) => {
                    const attackMonsterList = monsterList as MonsterInfo[]

                    return (
                      <FeedDetailItem
                        key={id}
                        monsterList={attackMonsterList}
                      />
                    )
                  })}
                </ul>
              </ScrollArea>
            ) : (
              <p className="flex h-full flex-1 select-none items-center justify-center text-sm text-gray-400">
                공덱을 추가해주세요.
              </p>
            )}
          </div>
        ) : (
          <p className="flex flex-1 select-none items-center justify-center text-sm text-gray-400">
            방덱을 선택해주세요.
          </p>
        )}
      </div>
    </div>
  )
}
