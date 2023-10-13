import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { getDynamicRoute } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function useFeedDelete() {
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const { mutateAsync: deleteFeed, isLoading } = useMutation(
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

        toast({
          title: "방어덱이 제거되었습니다.",
        })
      },
    }
  )

  return { deleteFeed, isLoading }
}
