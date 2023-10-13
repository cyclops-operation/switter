"use client"

import { CommentItem } from "@/interface/comment"
import { monsterList } from "@/interface/monster"
import { userRole } from "@/interface/user"
import clsx from "clsx"

import { dateDistanceToNow } from "@/lib/date"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/common/icons"
import MonsterImage from "@/components/common/monster-image"

import DeleteDialog from "../dialog/delete-dialog"

interface CommentCardProps extends CommentItem {
  onDelete?: (id: number) => void
}

const CommentCard = ({
  id,
  author,
  createdAt,
  monsterList: attackMonsterList,
  onDelete,
}: CommentCardProps) => {
  const commentList = monsterList.parse(attackMonsterList)

  return (
    <div className="group relative flex h-max cursor-pointer justify-between gap-6 overflow-hidden rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex flex-col items-center gap-2 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <span className="flex select-none flex-col">
            <em className="flex items-center text-xs font-semibold not-italic text-gray-400">
              {author.role === userRole.Enum.ADMIN ? (
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

      {onDelete && (
        <div
          className={clsx(
            "absolute inset-0 z-50 flex items-center justify-center opacity-0 transition-all bg-foreground/30",
            {
              "group-hover:opacity-100": true,
            }
          )}
        >
          <DeleteDialog
            title="공격덱을 삭제하시겠습니까?"
            description="삭제한 공격덱은 복구가 불가능합니다."
            onDelete={() => {
              onDelete(id)
            }}
          >
            <Button
              className="hover:bg-transparent"
              variant="ghost"
              size="menu"
            >
              <i className="global-menu remove" />
            </Button>
          </DeleteDialog>
        </div>
      )}
    </div>
  )
}

export default CommentCard
