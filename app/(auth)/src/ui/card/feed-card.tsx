"use client"

import { FeedItem } from "@/interface/feed"
import { MonsterList } from "@/interface/monster"
import { userRole } from "@/interface/user"
import { Comment } from "@prisma/client"
import clsx from "clsx"

import { dateDistanceToNow } from "@/lib/date"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/common/icons"
import { Meteors } from "@/components/common/meteor-effect"
import MonsterImage from "@/components/common/monster-image"

import DeleteDialog from "../dialog/delete-dialog"

interface FeedCardProps extends FeedItem {
  onDelete?: (id: number) => void
}

const FeedCard = ({
  id,
  author,
  viewCount,
  createdAt,
  monsterList,
  comments,
  onDelete,
}: FeedCardProps) => {
  const defenseMonsterList = monsterList as MonsterList
  const attackMonsterList = comments as Comment[]

  return (
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

        {onDelete && (
          <DeleteDialog
            title="방어덱을 삭제하시겠습니까?"
            description="방어덱을 삭제하면 연관된 공격덱도 모두
                삭제됩니다."
            onDelete={() => onDelete(id)}
          >
            <Button className="self-start" variant="ghost" size="icon-sm">
              <Icons.trash className="h-5 w-5 text-foreground opacity-70" />
            </Button>
          </DeleteDialog>
        )}
      </div>

      <div className="relative z-50 flex h-4/6 items-center justify-center gap-2">
        {defenseMonsterList.map((monsterInfo, index) => {
          const firstIndex = index === 0
          const lastIndex = index === defenseMonsterList.length - 1

          return (
            <div key={monsterInfo.id} className="flex h-full items-center">
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
          <Icons.eye size={18} className="text-foreground opacity-70" />
          <span className="select-none text-xs font-semibold">{viewCount}</span>
        </div>

        <div className="flex items-center gap-1">
          <Icons.swords
            size={16}
            className={clsx("text-foreground opacity-70", {
              "group-hover:animate-shake": attackMonsterList.length,
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
  )
}

export default FeedCard
