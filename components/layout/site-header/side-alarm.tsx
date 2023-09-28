"use client"

import { useState } from "react"
import Link from "next/link"

import { Alarm } from "@/interface/alarm"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/common/icons"

import Loading from "../../common/loading"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card"

const SideAlarm = () => {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false)

  const queryClient = useQueryClient()

  const { data: alarms, isLoading } = useQuery(
    [apiRoute.Alarm],
    async () =>
      await axios.get<Alarm[]>(apiRoute.Alarm).then(({ data }) => data)
  )

  const { mutate: patchAlarmReadM } = useMutation(
    async (id: number) =>
      axios.patch(`${apiRoute.Alarm}/${id}`, {
        isRead: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([apiRoute.Alarm])
      },
    }
  )

  const hasUnreadAlarm = !!alarms?.find(({ isRead }) => !isRead)

  return (
    <>
      <Button variant="ghost" onClick={() => setIsAlarmOpen((prev) => !prev)}>
        {hasUnreadAlarm ? <Icons.bellRing /> : <Icons.bell />}
      </Button>
      <AnimatePresence>
        {isAlarmOpen ? (
          <motion.div
            className="fixed right-3 top-20"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
          >
            <Card className="h-[50vh] w-96 overflow-y-scroll">
              <CardHeader>
                <CardTitle>알림 목록</CardTitle>
                <CardDescription>
                  전달된 알림 목록을 확인해보세요
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full space-y-2">
                {isLoading ? (
                  <Loading />
                ) : (
                  alarms?.map(({ id, title, description, isRead, url }) => (
                    <Link
                      key={id}
                      className="flex justify-between gap-2 transition-transform hover:translate-y-[1px]"
                      href={url}
                      onClick={() => !isRead && patchAlarmReadM(id)}
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
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default SideAlarm
