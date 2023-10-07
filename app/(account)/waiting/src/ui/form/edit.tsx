"use client"

import { User } from "@/interface/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { PatchMePayload } from "@/app/api/me/route"

import RequestForm, { WaitingForm } from "."

interface EditRequestFormProps {
  onCancel: () => void
}

export default function EditRequestForm({ onCancel }: EditRequestFormProps) {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const { data: account } = useQuery(
    [apiRoute.Me],
    async () => await axios.get<User>(apiRoute.Me).then(({ data }) => data)
  )

  const { mutate: patchAccountM, isLoading } = useMutation(
    async (body: PatchMePayload) => await axios.patch(apiRoute.Me, body),
    {
      onSuccess: () => {
        toast({ title: "성공적으로 계정이 수정되었습니다." })
        queryClient.refetchQueries([apiRoute.Me])
        onCancel()
      },
    }
  )

  const handleSubmit = async (values: WaitingForm) => {
    patchAccountM(values)
  }

  return (
    <RequestForm
      renderButton={({ submit }) => (
        <div className="flex gap-2">
          <Button {...submit} disabled={isLoading}>
            수정하기
          </Button>

          <Button
            type="button"
            className="w-full"
            variant="outline"
            disabled={isLoading}
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
