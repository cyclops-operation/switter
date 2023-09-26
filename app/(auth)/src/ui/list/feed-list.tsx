"use client"

import { useRouter } from "next/navigation"

import { MonsterList } from "@/interface/monster"
import { Comment } from "@prisma/client"
import clsx from "clsx"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"

import { dateDistanceToNow } from "@/lib/date"
import { pageRoute } from "@/lib/page-route"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/common/icons"
import { Meteors } from "@/components/common/meteor-effect"
import MonsterImage from "@/components/common/monster-image"

import useFeedList from "../../hooks/useFeedList"
import FeedDialog from "../dialog/feed-dialog"
import CommentSheet from "../sheet/comment-sheet"

const animations = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: "spring", stiffness: 900, damping: 40 },
}

export default function FeedList() {
  const { push: routerPush } = useRouter()

  const { feedList } = useFeedList()

  const handleFeedClick = (feedId: number) => {
    routerPush(pageRoute.FeedDetail(String(feedId)))
  }

  const isPresent = useIsPresent()

  return (
    <div className="py-4">
      <ul className="grid grid-cols-5 gap-2 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
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
                <CommentSheet key={id}>
                  <motion.li
                    layout
                    style={
                      isPresent
                        ? { position: "static" }
                        : { position: "absolute" }
                    }
                    onClick={() => handleFeedClick(id)}
                    {...animations}
                  >
                    <div className="group relative flex h-max cursor-pointer flex-col gap-6 overflow-hidden rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
                      <div className="relative z-50 flex items-center gap-2 backdrop-blur-sm">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>{author.name}</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-1">
                          <span className="flex select-none items-center gap-1">
                            <em className="flex items-center text-xs font-semibold not-italic text-gray-400">
                              <Icons.award size={14} />
                              {author.guildName}
                            </em>

                            <em className="text-sm font-semibold not-italic text-foreground">
                              {author.name}
                            </em>
                          </span>

                          <span className="ml-[2px] flex select-none gap-1 text-xs font-medium text-gray-400">
                            {dateDistanceToNow(createdAt)}
                          </span>
                        </div>
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
                                  "cursor-auto drop-shadow-lg transition-transform duration-300",
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
                </CommentSheet>
              )
            }
          )}
        </AnimatePresence>
      </ul>
    </div>
  )
}
