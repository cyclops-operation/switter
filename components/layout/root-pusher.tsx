"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Account, accountRole } from "@/interface/account"
import { Alarm } from "@/interface/alarm"
import { ToastAction } from "@radix-ui/react-toast"

import { clientPusher, pusherChannel, pusherEvent } from "@/lib/pusher"

import { useToast } from "../ui/use-toast"

type RootPusherProps = Pick<Account, "role">

const RootPusher = ({ role }: RootPusherProps) => {
  const { push } = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const channel = clientPusher.subscribe(pusherChannel.Auth)

    channel.bind(pusherEvent.SignIn, ({ title, description, url }: Alarm) => {
      if (role === accountRole.Enum.ADMIN) {
        toast({
          title,
          description,
          action: (
            <ToastAction altText="유저 리스트" onClick={() => push(url)}>
              유저 리스트 확인
            </ToastAction>
          ),
        })
      }
    })

    return () => {
      clientPusher.unsubscribe(pusherChannel.Auth)
    }
  }, [push, role, toast])

  return null
}

export default RootPusher
