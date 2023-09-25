"use client"

import { useState } from "react"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { pageRoute } from "@/lib/page-route"
import { pusher, pusherChannel, pusherEvent } from "@/lib/pusher"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/common/icons"
import { PutAlarmAdminPayload } from "@/app/api/alarm/admin/route"

import EditRequestForm from "./form/edit"

const AccountPending = () => {
  const [isEdit, setIsEdit] = useState(false)

  const { toast } = useToast()

  const alarmData = {
    title: "새로운 유저가 가입을 신청했습니다.",
    description: "유저 권한을 확인해주세요.",
    url: pageRoute.Admin,
  }

  const { mutate: putAlarmM } = useMutation(
    async () => {
      const body: PutAlarmAdminPayload = {
        ...alarmData,
        eventType: pusherEvent.SignIn,
      }

      return await axios.put(apiRoute.AlarmAdmin, body)
    },
    {
      onSuccess: async () => {
        await pusher.trigger(pusherChannel.Auth, pusherEvent.SignIn, {
          title: "새로운 유저가 가입을 신청했습니다.",
          description: "유저 권한을 확인해주세요.",
          url: pageRoute.Admin,
        })

        toast({ title: "승인 요청 알림이 전송되었습니다." })
      },
    }
  )

  const changeEditState = () => {
    setIsEdit(true)
  }

  const sendAlarm = () => {
    if (!pusher) return

    putAlarmM()
  }

  if (isEdit) return <EditRequestForm onCancel={() => setIsEdit(false)} />

  return (
    <div className="space-y-2">
      <Button className="w-full gap-2" onClick={changeEditState}>
        <Icons.fileEdit size={16} /> 입력 정보 수정하기
      </Button>
      <Button className="w-full gap-2" onClick={sendAlarm}>
        <Icons.alarm size={16} /> 승인 요청 알림 재전송
      </Button>
    </div>
  )
}

export default AccountPending
