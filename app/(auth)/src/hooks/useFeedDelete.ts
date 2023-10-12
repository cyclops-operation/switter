import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { getDynamicRoute } from "@/lib/utils"

export default function useFeedDelete() {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteFeed } = useMutation(
    [apiRoute.Feed],
    async (feedId: number) => {
      await axios.delete(
        getDynamicRoute(apiRoute.Feed, {
          query: {
            feedId,
          },
        })
      )
    },
    {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries([apiRoute.Feed]),
          queryClient.invalidateQueries([apiRoute.Comment]),
        ])
      },
    }
  )

  return { deleteFeed }
}
