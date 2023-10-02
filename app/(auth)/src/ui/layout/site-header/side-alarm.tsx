"use client"

import { useState } from "react"
import Link from "next/link"

import { Notification } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { pageRoute } from "@/lib/page-route"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/common/icons"

import Loading from "../../../../../../components/common/loading"

const SideAlarm = () => {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false)

  const { data: notification, isLoading } = useQuery(
    [apiRoute.Notifiaction],
    async () =>
      await axios
        .get<Notification[]>(apiRoute.Notifiaction)
        .then(({ data }) => data)
  )

  const isEmpty = notification?.length === 0

  const changeAlarmOpenState = () => {
    setIsAlarmOpen((prev) => !prev)
  }

  const hasUnreadAlarm = !!notification?.find(({ isRead }) => !isRead)

  return (
    <Sheet modal open={isAlarmOpen} onOpenChange={changeAlarmOpenState}>
      <SheetTrigger className="cursor-pointer" asChild>
        {hasUnreadAlarm ? <Icons.bellRing /> : <Icons.bell />}
      </SheetTrigger>

      <SheetContent className="overflow-y-scroll" side="right">
        <SheetHeader>
          <SheetTitle>알림 목록</SheetTitle>
          <SheetDescription>전달된 알림 목록을 확인해보세요</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <Loading />
        ) : isEmpty ? (
          <div>알림이 없습니다.</div>
        ) : (
          <div className="flex flex-col gap-2 pt-8">
            {notification?.map(({ id, title, description, isRead }) => (
              <Link
                key={id}
                className="flex justify-between gap-2 transition-transform hover:translate-y-[1px]"
                href={pageRoute.Admin}
                onClick={() => {}}
              >
                <div className="space-y-1">
                  <p className="text-sm">{title}</p>
                  {description ? (
                    <p className="text-xs text-zinc-400">{description}</p>
                  ) : null}
                </div>
                {!isRead ? (
                  <div className="mt-2 h-[6px] w-[6px] rounded-full bg-green-600" />
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default SideAlarm
