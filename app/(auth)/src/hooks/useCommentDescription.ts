import { useSearchParams } from "next/navigation"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { getDynamicRoute } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function useCommentDescription() {
  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const { toast } = useToast()

  const queryClient = useQueryClient()

  const { mutateAsync: updateCommentDescription, isLoading } = useMutation(
    [apiRoute.Comment],
    async ({
      commentId,
      description,
    }: {
      commentId: number
      description: string
    }) => {
      if (!feedId) return

      await axios.patch(
        getDynamicRoute(apiRoute.CommentDescription, {
          query: {
            commentId,
          },
        }),
        { description }
      )
    },
    {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries([apiRoute.Comment, feedId]),
        ])

        toast({
          title: "공격덱 설명을 수정했습니다.",
        })
      },
    }
  )

  return { updateCommentDescription, isLoading }
}
