"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Account, accountRole } from "@/interface/account"
import { Alarm } from "@/interface/alarm"
import { ToastAction } from "@radix-ui/react-toast"
import { useQueryClient } from "@tanstack/react-query"

import { apiRoute } from "@/lib/api-route"
import { pageRoute } from "@/lib/page-route"
import { clientPusher, pusherChannel, pusherEvent } from "@/lib/pusher"

import { useToast } from "../../../../../components/ui/use-toast"

type RootPusherProps = Pick<Account, "role">

const RootPusher = ({ role }: RootPusherProps) => {
  const { push } = useRouter()

  const queryClient = useQueryClient()

  const { toast } = useToast()

  const refreshNotification = useCallback(async () => {
    await queryClient.invalidateQueries([apiRoute.Notifiaction])
  }, [queryClient])

  useEffect(() => {
    const channel = clientPusher.subscribe(pusherChannel.Auth)

    channel.bind(pusherEvent.SignIn, ({ title, description }: Alarm) => {
      if (role === accountRole.Enum.ADMIN) {
        refreshNotification()

        toast({
          title,
          description,
          action: (
            <ToastAction
              altText="유저 리스트"
              onClick={() => push(pageRoute.Admin)}
            >
              유저 리스트 확인
            </ToastAction>
          ),
        })
      }
    })

    return () => {
      clientPusher.unsubscribe(pusherChannel.Auth)
    }
  }, [push, role, toast, refreshNotification])

  return null
}

export default RootPusher
