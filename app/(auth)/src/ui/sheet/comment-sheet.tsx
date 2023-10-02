import { ChangeEvent, ReactNode, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { accountRole } from "@/interface/account"
import { MonsterList, monsterList } from "@/interface/monster"
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
import { debounce } from "@/lib/utils"
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
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/common/icons"
import Loading from "@/components/common/loading"
import MonsterImage from "@/components/common/monster-image"

import useCommentDelete from "../../hooks/useCommentDelete"
import useCommentList from "../../hooks/useCommentList"
import useFeedDelete from "../../hooks/useFeedDelete"
import CommentDialog from "../dialog/comment-dialog"

const animations: AnimationProps = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: "Spring", stiffness: 900, damping: 30 },
}

interface CommentSheetProps {
  children: ReactNode
}

export default function CommentSheet({ children }: CommentSheetProps) {
  const { push: routerPush } = useRouter()

  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const { data } = useSession()

  const { commentList: originCommentList, isCommentListLoading } =
    useCommentList()

  const { deleteFeed } = useFeedDelete()

  const { deleteComment, isDeleteCommentLoading } = useCommentDelete()

  const isPresent = useIsPresent()

  const [searchTerm, setSearchTerm] = useState("")

  const isLoading = isCommentListLoading || isDeleteCommentLoading

  const userId = data?.user.id

  const isAdmin = data?.user.role === accountRole.Enum.ADMIN

  const debounceSearchTerm = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm)
  }, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: searchTerm } = e.target
    debounceSearchTerm(searchTerm)
  }

  const commentList = useMemo(() => {
    if (!searchTerm) return originCommentList

    return originCommentList?.filter(({ monsterList, keyword }) => {
      const attackMonsterList = monsterList as MonsterList

      return (
        keyword?.indexOf(searchTerm) !== -1 ||
        attackMonsterList.some(
          (monsterInfo) =>
            monsterInfo.originName
              .toLocaleLowerCase()
              .indexOf(searchTerm.toLocaleLowerCase()) !== -1 ||
            monsterInfo.monsterName?.indexOf(searchTerm) !== -1
        )
      )
    })
  }, [originCommentList, searchTerm])

  const hasCommentList = Boolean(commentList?.length)

  const feedInfo = useMemo(() => {
    if (!commentList?.length) return undefined

    const feed = commentList[0].feed

    const feedMonsterList = feed.monsterList as MonsterList

    const author = commentList[0].author

    return { feed: { ...feed, monsterList: feedMonsterList }, author }
  }, [commentList])

  const handleCommentDelete = (commentId: number) => {
    if (!feedId) throw Error(apiErrorMessage.BadRequest)

    deleteComment(commentId)
  }

  const handleFeedDelete = () => {
    if (!feedId) throw Error(apiErrorMessage.BadRequest)

    deleteFeed(Number(feedId))
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
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="left"
        className={clsx("flex flex-col justify-between sm:max-w-3xl", {
          "sm:max-w-sm": !hasCommentList,
        })}
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
                        {feedInfo?.author.name}
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

                  <div className="flex items-center gap-4">
                    <Input
                      className="flex-1"
                      id="search"
                      placeholder="검색어를 입력해주세요."
                      autoComplete="off"
                      onChange={handleChange}
                    />
                  </div>

                  <Separator />
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
                <ul className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
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
                                  "absolute inset-0 z-50 flex items-center justify-center opacity-0 transition-all bg-foreground/30",
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
                                      <AlertDialogCancel>
                                        취소
                                      </AlertDialogCancel>
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
              )}
            </div>

            {hasCommentList && (
              <SheetFooter className="bg-red">
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
                        방어덱을 삭제하시겠습니까?
                      </AlertDialogTitle>

                      <AlertDialogDescription className="select-none">
                        방어덱을 삭제하면 연관된 공격덱도 모두 삭제됩니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={!feedId}
                        onClick={() => handleFeedDelete()}
                        className={buttonVariants({
                          variant: "destructive",
                        })}
                      >
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SheetFooter>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
