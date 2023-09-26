import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"

export default function useFeedDelete() {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteFeed } = useMutation(
    [apiRoute.Feed],
    async (feedId: number) => {
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
