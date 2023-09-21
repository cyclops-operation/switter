"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { PostAccountPayload } from "@/app/api/account/route"

import RequestForm, { WaitingForm } from "."

const CreateRequestForm = () => {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const { mutate: postAccountM } = useMutation(
    async (body: PostAccountPayload) =>
      await axios.post(apiRoute.Account, body),
    {
      onSuccess: () => {
        toast({ title: "성공적으로 계정이 생성되었습니다.", duration: 1000 })
        queryClient.refetchQueries([apiRoute.Account])
      },
    }
  )

  const handleSubmit = async (values: WaitingForm) => {
    postAccountM(values)
  }

  return (
    <RequestForm
      renderButton={({ submit }) => <Button {...submit}>가입 요청하기</Button>}
      onSubmit={handleSubmit}
    />
  )
}

export default CreateRequestForm
