import { useSearchParams } from "next/navigation"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { useToast } from "@/components/ui/use-toast"

export default function useCommentDelete() {
  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const { toast } = useToast()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteComment, isLoading } = useMutation(
    [apiRoute.Comment],
    async (commentId: number) => {
      if (!feedId) return

      await axios.delete(`${apiRoute.Comment}?commentId=${commentId}`)
    },
    {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries([apiRoute.Comment, feedId]),
          queryClient.invalidateQueries([apiRoute.Feed]),
        ])

        toast({
          title: "공격덱이 삭제되었습니다.",
        })
      },
    }
  )

  return { deleteComment, isLoading }
}
