"use client"

import { useState } from "react"

import { NotificationType } from "@/interface/notification"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { pusher } from "@/lib/pusher"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/common/icons"

import EditRequestForm from "./form/edit"

const AccountPending = () => {
  const [isEdit, setIsEdit] = useState(false)

  const { toast } = useToast()

  const { mutate: putAlarmM } = useMutation(
    async () => {
      const payload: NotificationType = {
        type: "Admin",
      }

      return await axios.post(apiRoute.Notifiaction, payload)
    },
    {
      onSuccess: () => {
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
