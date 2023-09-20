"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/common/icons"

const AccountPending = () => {
  const { toast } = useToast()

  const sendAlarm = () => {
    // TODO 알람 로직 추가
    toast({ title: "알림이 전송되었습니다." })
  }

  return (
    <Button className="w-full gap-2" onClick={sendAlarm}>
      <Icons.alarm size={16} /> 승인 요청 알림 재전송
    </Button>
  )
}

export default AccountPending
