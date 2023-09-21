"use client"

import { Account } from "@/interface/account"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { PatchAccountPayload } from "@/app/api/account/route"

import RequestForm, { WaitingForm } from "."

interface EditRequestFormProps {
  onCancel: () => void
}

const EditRequestForm = ({ onCancel }: EditRequestFormProps) => {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const account = queryClient.getQueryData<Account>([apiRoute.Account])

  const { mutate: patchAccountM, isLoading } = useMutation(
    async (body: PatchAccountPayload) =>
      await axios.patch(apiRoute.Account, body),
    {
      onSuccess: () => {
        toast({ title: "성공적으로 계정이 수정되었습니다.", duration: 1000 })
        queryClient.refetchQueries([apiRoute.Account])
        onCancel()
      },
    }
  )

  const disabled = isLoading

  const handleSubmit = async (values: WaitingForm) => {
    patchAccountM(values)
  }

  return (
    <RequestForm
      renderButton={({ submit }) => (
        <div className="flex gap-2">
          <Button {...submit} disabled={disabled}>
            수정하기
          </Button>
          <Button
            className="w-full"
            variant="outline"
            disabled={disabled}
            onClick={onCancel}
          >
            취소
          </Button>
        </div>
      )}
      onSubmit={handleSubmit}
      defaultValues={account}
    />
  )
}

export default EditRequestForm
