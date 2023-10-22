"use client"

import { useRef, useState } from "react"

import { CommentItem } from "@/interface/comment"
import { deckMonsterList } from "@/interface/monster"
import { userRole } from "@/interface/user"
import clsx from "clsx"
import { useSession } from "next-auth/react"

import { dateDistanceToNow } from "@/lib/date"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/common/icons"
import MonsterImage from "@/components/common/monster-image"

import DeleteDialog from "../dialog/delete-dialog"

interface CommentCardProps extends CommentItem {
  onDelete?: (id: number) => void
  onDescriptionUpdate?: ({
    commentId,
    description,
  }: {
    commentId: number
    description?: string
  }) => void
}

export default function CommentCard({
  id,
  author,
  createdAt,
  monsterList: attackMonsterList,
  description,
  onDelete,
  onDescriptionUpdate,
}: CommentCardProps) {
  const { data: session } = useSession()

  const [isEdit, setIsEdit] = useState(false)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const isAdmin =
    author.role === userRole.Enum.ADMIN ||
    session?.user.role === userRole.Enum.ADMIN

  const isCreator = author.id === session?.user.id

  const allowsEditing = isAdmin || isCreator

  const commentList = deckMonsterList.parse(attackMonsterList)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="group relative flex h-max cursor-pointer justify-between gap-6 overflow-hidden rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
          <div className="flex flex-col items-center gap-2 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <span className="flex select-none flex-col">
                <em className="flex items-center text-xs font-semibold not-italic text-gray-400">
                  {isAdmin ? (
                    <Icons.crown className="mr-0.5" size={14} />
                  ) : (
                    <Icons.award size={14} />
                  )}
                  {author.guildName}
                </em>
                <em className="text-sm font-semibold not-italic text-foreground">
                  {author.nickname}
                </em>
              </span>

              <span className="flex select-none gap-1 text-xs font-medium text-gray-400">
                {dateDistanceToNow(createdAt)}
              </span>
            </div>
          </div>

          <div className="relative flex h-4/6 items-center justify-center gap-2">
            {commentList.map((monsterInfo) => {
              return (
                <MonsterImage
                  key={monsterInfo.id}
                  className="z-0 cursor-pointer drop-shadow-lg"
                  monsterInfo={monsterInfo}
                />
              )
            })}
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        align="start"
        alignOffset={4}
        className="flex w-[300px] flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold not-italic text-foreground">
            공격덱 설명
          </span>

          {allowsEditing && (
            <DeleteDialog
              title="공격덱을 삭제하시겠습니까?"
              description="삭제한 공격덱은 복구가 불가능합니다."
              onDelete={() => {
                onDelete?.(id)
              }}
            >
              <Button variant="ghost" size="icon-sm">
                <Icons.trash className="h-5 w-5 text-foreground opacity-70" />
              </Button>
            </DeleteDialog>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {allowsEditing ? (
            <>
              {isEdit ? (
                <>
                  <Textarea
                    ref={textAreaRef}
                    className={clsx("text-sm text-gray-500 whitespace-pre", {
                      "text-foreground": Boolean(description),
                    })}
                  >
                    {description}
                  </Textarea>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      variant="outline"
                      onClick={() => setIsEdit(false)}
                    >
                      취소
                    </Button>

                    <Button
                      className="flex-1"
                      variant="default"
                      onClick={() =>
                        onDescriptionUpdate?.({
                          commentId: id,
                          description: textAreaRef.current?.value,
                        })
                      }
                    >
                      저장
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="whitespace-pre text-sm text-gray-500">
                    {description || ""}
                  </p>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setIsEdit(true)}
                  >
                    수정
                  </Button>
                </>
              )}
            </>
          ) : (
            <p className="whitespace-pre text-sm text-gray-500">
              {description || "공격덱 설명이 없습니다."}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
