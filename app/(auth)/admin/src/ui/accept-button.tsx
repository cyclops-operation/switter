"use client"

import { useRouter } from "next/navigation"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface AcceptButtonProps {
  id: number
}

const AcceptButton = ({ id }: AcceptButtonProps) => {
  const { refresh } = useRouter()
  const { toast } = useToast()

  const { mutate: patchPendingUserM } = useMutation(
    async () =>
      await axios.patch(apiRoute.UserPending, {
        id,
      }),
    {
      onSuccess: () => {
        toast({ title: "성공적으로 승인되었습니다!" })
        refresh()
      },
    }
  )

  return (
    <Button variant="ghost" onClick={() => patchPendingUserM()}>
      승인
    </Button>
  )
}

export { type AcceptButtonProps }

export default AcceptButton
