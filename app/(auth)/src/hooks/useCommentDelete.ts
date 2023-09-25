import { useSearchParams } from "next/navigation"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"

export default function useCommentDelete() {
  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const queryClient = useQueryClient()

  const { mutateAsync: deleteFeed } = useMutation(
    [apiRoute.Feed],
    async () => {
      await axios.delete(`${apiRoute.Feed}?feedId=${feedId}`)
    },
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries([apiRoute.Feed])
          .then(() => queryClient.invalidateQueries([apiRoute.Comment]))
      },
    }
  )

  return { deleteFeed }
}
