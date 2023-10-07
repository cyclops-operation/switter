"use client"

import { useRouter } from "next/navigation"

import { MonsterList } from "@/interface/monster"
import { userRole } from "@/interface/user"
import { Comment } from "@prisma/client"
import clsx from "clsx"
import {
  AnimatePresence,
  AnimationProps,
  motion,
  useIsPresent,
} from "framer-motion"
import { useSession } from "next-auth/react"

import { dateDistanceToNow } from "@/lib/date"
import { apiErrorMessage } from "@/lib/error-message"
import { pageRoute } from "@/lib/page-route"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/common/icons"
import Loading from "@/components/common/loading"
import { Meteors } from "@/components/common/meteor-effect"
import MonsterImage from "@/components/common/monster-image"

import useFeedDelete from "../../hooks/useFeedDelete"
import useFeedList from "../../hooks/useFeedList"
import FeedDialog from "../dialog/feed-dialog"

const animations: AnimationProps = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: "spring", stiffness: 900, damping: 40 },
}

export default function FeedList() {
  const { data: session } = useSession()

  const { push: routerPush } = useRouter()

  const { feedList, isFeedListLoading } = useFeedList()

  const { deleteFeed } = useFeedDelete()

  const handleFeedDelete = (feedId: number) => {
    if (!feedId) throw Error(apiErrorMessage.BadRequest)

    deleteFeed(Number(feedId))
  }

  const handleFeedClick = (feedId: number) => {
    routerPush(pageRoute.FeedDetail(String(feedId)))
  }

  const isPresent = useIsPresent()

  const userId = session?.user.id

  const isAdmin = session?.user.role === userRole.Enum.ADMIN

  return (
    <div className="pb-4">
      {isFeedListLoading ? (
        <Loading className="h-full w-full" />
      ) : (
        <ul className="grid grid-cols-4 gap-[16px_8px] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          <FeedDialog>
            <li className="group flex h-full min-h-[200px] cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <Icons.plus
                size={30}
                className="text-gray-200 transition-colors duration-300 group-hover:animate-shake group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-100"
              />
            </li>
          </FeedDialog>

          <AnimatePresence>
            {feedList.map(
              ({ monsterList, id, author, createdAt, comments, viewCount }) => {
                const defenseMonsterList = monsterList as MonsterList
                const attackMonsterList = comments as Comment[]

                return (
                  <motion.li
                    key={id}
                    className="relative z-0"
                    layout
                    style={
                      isPresent
                        ? { position: "static" }
                        : { position: "absolute" }
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()

                      handleFeedClick(id)
                    }}
                    {...animations}
                  >
                    <div className="group relative flex h-max cursor-pointer flex-col gap-6 overflow-hidden rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
                      <div className="relative z-50 flex justify-between gap-2 backdrop-blur-sm">
                        <div className="flex gap-2">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>{author.nickname}</AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col gap-1">
                            <span className="flex select-none items-center gap-1">
                              <em className="flex items-center text-xs font-semibold not-italic text-gray-400">
                                {author.role === userRole.Enum.ADMIN ? (
                                  <Icons.crown className="mr-0.5" size={14} />
                                ) : (
                                  <Icons.award size={14} />
                                )}

                                {author.guildName}
                              </em>

                              <em className="max-w-[120px] truncate text-sm font-semibold not-italic text-foreground">
                                {author.nickname}
                              </em>
                            </span>

                            <span className="ml-[2px] flex select-none gap-1 text-xs font-medium text-gray-400">
                              {dateDistanceToNow(createdAt)}
                            </span>
                          </div>
                        </div>

                        {(isAdmin || userId === author.id) && (
                          <AlertDialog>
                            <AlertDialogTrigger
                              asChild
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                            >
                              <Button
                                className="self-start"
                                variant="ghost"
                                size="icon-sm"
                              >
                                <Icons.trash className="h-5 w-5 text-foreground opacity-70" />
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="select-none">
                                  방어덱을 삭제하시겠습니까?
                                </AlertDialogTitle>

                                <AlertDialogDescription className="select-none">
                                  방어덱을 삭제하면 연관된 공격덱도 모두
                                  삭제됩니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  취소
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFeedDelete(id)
                                  }}
                                  className={buttonVariants({
                                    variant: "destructive",
                                  })}
                                >
                                  삭제
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>

                      <div className="relative z-50 flex h-4/6 items-center justify-center gap-2">
                        {defenseMonsterList.map((monsterInfo, index) => {
                          const firstIndex = index === 0
                          const lastIndex =
                            index === defenseMonsterList.length - 1

                          return (
                            <div
                              key={monsterInfo.id}
                              className="flex h-full items-center"
                            >
                              <MonsterImage
                                className={clsx(
                                  "drop-shadow-lg transition-transform duration-300",
                                  {
                                    "group-hover:translate-y-1": firstIndex,
                                    "group-hover:translate-y-[-4px]": lastIndex,
                                  }
                                )}
                                monsterInfo={monsterInfo}
                              />
                            </div>
                          )
                        })}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Icons.eye
                            size={18}
                            className="text-foreground opacity-70"
                          />
                          <span className="select-none text-xs font-semibold">
                            {viewCount}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Icons.swords
                            size={16}
                            className={clsx("text-foreground opacity-70", {
                              "group-hover:animate-shake":
                                attackMonsterList.length,
                            })}
                          />
                          <span className="select-none text-xs font-semibold">
                            {attackMonsterList?.length}
                          </span>
                        </div>
                      </div>

                      <Meteors
                        number={8}
                        className="invisible transition-all group-hover:visible group-hover:animate-meteor-effect"
                      />
                    </div>
                  </motion.li>
                )
              }
            )}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}
