import { ReactNode, useMemo, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { accountRole } from "@/interface/account"
import { monsterList } from "@/interface/monster"
import clsx from "clsx"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"
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
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/common/icons"
import Loading from "@/components/common/loading"
import MonsterImage from "@/components/common/monster-image"

import useCommentDelete from "../../hooks/useCommentDelete"
import useCommentList from "../../hooks/useCommentList"
import useFeedDelete from "../../hooks/useFeedDelete"
import CommentDialog from "../dialog/comment-dialog"

const animations = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: "spring", stiffness: 900, damping: 40 },
}

interface CommentSheetProps {
  children: ReactNode
}

export default function CommentSheet({ children }: CommentSheetProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { push: routerPush } = useRouter()

  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const { data } = useSession()

  const { commentList, isCommentListLoading } = useCommentList()

  const { deleteFeed } = useFeedDelete()

  const { deleteComment, isDeleteCommentLoading } = useCommentDelete()

  const isPresent = useIsPresent()

  const userId = data?.user.id

  const isAdmin = data?.user.role === accountRole.Enum.ADMIN

  const feedInfo = useMemo(() => {
    if (!commentList?.length) return undefined

    const feed = commentList[0].feed

    const author = commentList[0].author

    return { feed, author }
  }, [commentList])

  const handleCommentDelete = (commentId: number) => {
    if (!feedId) throw Error(apiErrorMessage.BadRequest)

    deleteComment(commentId)
  }

  const isLoading = isCommentListLoading || isDeleteCommentLoading

  return (
    <Sheet
      modal
      open={Boolean(feedId)}
      onOpenChange={(isSheetOpen) => {
        if (isSheetOpen) return

        routerPush(pageRoute.Feed)
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="left" className="absolute flex flex-col">
        {isLoading ? (
          <Loading className="absolute inset-0 z-50 h-full w-full" />
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <div className="flex items-center gap-4">
              <Input
                ref={inputRef}
                className="flex-1"
                id="search"
                placeholder="검색어를 입력해주세요."
              />
            </div>

            <ul className="flex flex-col gap-4">
              <CommentDialog>
                <li className="group flex h-full min-h-[60px] cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <Icons.plus
                    size={30}
                    className="text-gray-200 transition-colors duration-300 group-hover:animate-shake group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-100"
                  />
                </li>
              </CommentDialog>

              <AnimatePresence>
                {commentList?.map(
                  ({
                    id,
                    author,
                    createdAt,
                    monsterList: attackMonsterList,
                  }) => {
                    const commentList = monsterList.parse(attackMonsterList)

                    return (
                      <motion.li
                        key={id}
                        layout
                        style={
                          isPresent
                            ? { position: "static" }
                            : { position: "absolute" }
                        }
                        onClick={() => {}}
                        {...animations}
                      >
                        <div className="group relative flex h-max cursor-pointer justify-between gap-6 overflow-hidden rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
                          <div className="flex flex-col items-center gap-2 backdrop-blur-sm">
                            <div className="flex flex-col gap-1">
                              <span className="flex select-none flex-col">
                                <em className="flex items-center text-xs font-semibold not-italic text-gray-400">
                                  <Icons.award size={14} />
                                  {author.guildName}
                                </em>
                                <em className="text-sm font-semibold not-italic text-foreground">
                                  {author.name}
                                </em>
                              </span>

                              <span className="flex select-none gap-1 text-xs font-medium text-gray-400">
                                {dateDistanceToNow(createdAt)}
                              </span>
                            </div>
                          </div>

                          <div className="relative z-50 flex h-4/6 items-center justify-center gap-2">
                            {commentList.map((monsterInfo) => {
                              return (
                                <MonsterImage
                                  key={monsterInfo.id}
                                  className="cursor-auto drop-shadow-lg"
                                  monsterInfo={monsterInfo}
                                />
                              )
                            })}
                          </div>

                          <div
                            className={clsx(
                              "absolute inset-0 z-50 flex items-center justify-center opacity-0 backdrop-blur-lg transition-all delay-300 group-hover:border-transparent",
                              {
                                "group-hover:opacity-100":
                                  isAdmin || userId === author.id,
                              }
                            )}
                          >
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  className="hover:bg-transparent"
                                  variant="ghost"
                                  size="menu"
                                >
                                  <i className="global-menu remove" />
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="select-none">
                                    공격덱을 삭제하시겠습니까?
                                  </AlertDialogTitle>

                                  <AlertDialogDescription className="select-none">
                                    삭제한 공격덱은 복구가 불가능합니다.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel>취소</AlertDialogCancel>
                                  <AlertDialogAction
                                    disabled={!feedId}
                                    onClick={() => handleCommentDelete(id)}
                                    className={buttonVariants({
                                      variant: "destructive",
                                    })}
                                  >
                                    삭제
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </motion.li>
                    )
                  }
                )}
              </AnimatePresence>
            </ul>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
