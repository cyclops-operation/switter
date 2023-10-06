import { useSearchParams } from "next/navigation"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"

export default function useCommentDelete() {
  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const queryClient = useQueryClient()

  const { mutateAsync: deleteComment, isLoading: isDeleteCommentLoading } =
    useMutation(
      [apiRoute.Comment],
      async (commentId: number) => {
        if (!feedId) return

        await axios.delete(`${apiRoute.Comment}?commentId=${commentId}`)
      },
      {
        onSuccess: () => {
          queryClient
            .invalidateQueries([apiRoute.Comment, feedId])
            .then(() => queryClient.invalidateQueries([apiRoute.Feed]))
        },
      }
    )

  return { deleteComment, isDeleteCommentLoading }
}
