"use client"

import { useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { DeckMonsterList } from "@/interface/monster"
import { userRole } from "@/interface/user"
import clsx from "clsx"
import {
  AnimatePresence,
  AnimationProps,
  motion,
  useIsPresent,
} from "framer-motion"
import { useSession } from "next-auth/react"

import { apiErrorMessage } from "@/lib/error-message"
import { pageRoute } from "@/lib/page-route"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet"
import { Icons } from "@/components/common/icons"
import Loading from "@/components/common/loading"
import MonsterImage from "@/components/common/monster-image"

import useCommentDelete from "../../hooks/useCommentDelete"
import useCommentDescription from "../../hooks/useCommentDescription"
import useCommentList from "../../hooks/useCommentList"
import CommentCard from "../card/comment-card"
import CommentDialog from "../dialog/comment-dialog"

const animations: AnimationProps = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: "Spring", stiffness: 900, damping: 30, delay: 0.25 },
}

export default function CommentSheet() {
  const { push: routerPush } = useRouter()

  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const { data: session } = useSession()

  const { commentList, isCommentListLoading } = useCommentList()

  const { deleteComment, isLoading: isDeleteCommentLoading } =
    useCommentDelete()

  const {
    updateCommentDescription,
    isLoading: isUpdateCommentDescriptionLoading,
  } = useCommentDescription()

  const isPresent = useIsPresent()

  const isLoading =
    isCommentListLoading ||
    isDeleteCommentLoading ||
    isUpdateCommentDescriptionLoading

  const sessionUserId = session?.user.id

  const isAdmin = session?.user.role === userRole.Enum.ADMIN

  const hasCommentList = Boolean(commentList?.length)

  const feedInfo = useMemo(() => {
    if (!commentList?.length) return undefined

    const feed = commentList[0].feed

    const feedMonsterList = feed.monsterList as DeckMonsterList

    const author = commentList[0].author

    return { feed: { ...feed, monsterList: feedMonsterList }, author }
  }, [commentList])

  const handleCommentDelete = (commentId: number) => {
    if (!feedId) throw Error(apiErrorMessage.BadRequest)

    deleteComment(commentId)
  }

  const handleCommentDescriptionUpdate = ({
    commentId,
    description,
  }: {
    commentId: number
    description?: string
  }) => {
    if (!description) return

    updateCommentDescription({ commentId, description })
  }

  return (
    <Sheet
      modal
      open={Boolean(feedId)}
      onOpenChange={(isSheetOpen) => {
        if (isSheetOpen) return

        routerPush(pageRoute.Feed)
      }}
    >
      <SheetContent
        side="left"
        className={clsx(
          "flex flex-col transition-all justify-between sm:max-w-3xl",
          {
            "sm:max-w-sm": !hasCommentList,
          }
        )}
      >
        {isLoading ? (
          <Loading className="absolute inset-0 z-50 h-full w-full" />
        ) : (
          <>
            <div className="flex h-full flex-col gap-4">
              {hasCommentList && (
                <>
                  <SheetHeader>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        {feedInfo?.feed.monsterList.map((monsterInfo) => (
                          <MonsterImage
                            key={monsterInfo.id}
                            className="cursor-default drop-shadow-lg"
                            monsterInfo={monsterInfo}
                          />
                        ))}
                      </div>
                    </div>

                    <SheetDescription>
                      <em className="font-bold not-italic">
                        {feedInfo?.author.nickname}
                      </em>
                      &nbsp;사용자가 추가한&nbsp;
                      <span className="font-bold">
                        {feedInfo?.feed.monsterList
                          .map(({ monsterName }) => monsterName)
                          .join(", ")}
                        &nbsp;
                      </span>
                      방어덱입니다.
                    </SheetDescription>
                  </SheetHeader>
                </>
              )}

              <CommentDialog>
                <div
                  className={clsx(
                    "group flex min-h-[60px] cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-4 shadow-sm transition-shadow duration-300 hover:shadow-md",
                    {
                      "h-full mt-4": !feedInfo,
                    }
                  )}
                >
                  <Icons.plus
                    size={30}
                    className="text-gray-200 transition-colors duration-300 group-hover:animate-shake group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-100"
                  />
                </div>
              </CommentDialog>

              {hasCommentList && (
                <ul className="grid grid-cols-1 gap-4">
                  <AnimatePresence>
                    {commentList?.map((props) => {
                      return (
                        <motion.li
                          key={props.id}
                          layout
                          style={
                            isPresent
                              ? { position: "static" }
                              : { position: "absolute" }
                          }
                          {...animations}
                        >
                          <CommentCard
                            {...props}
                            onDelete={
                              isAdmin || sessionUserId === props.author.id
                                ? (id) => handleCommentDelete(id)
                                : undefined
                            }
                            onDescriptionUpdate={handleCommentDescriptionUpdate}
                          />
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
