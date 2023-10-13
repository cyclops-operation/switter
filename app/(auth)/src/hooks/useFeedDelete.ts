import { useSearchParams } from "next/navigation"

import { FeedItem } from "@/interface/feed"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { getDynamicRoute } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function useFeedDelete() {
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const searchParams = useSearchParams()

  const searchTerm = searchParams.get("searchTerm")

  const { mutateAsync: deleteFeed, isLoading } = useMutation(
    [apiRoute.Feed],
    async (feedId: number) => {
      queryClient.setQueryData<FeedItem[]>(
        [apiRoute.Feed, searchTerm],
        (list) => list?.filter(({ id }) => id !== feedId)
      )

      await axios.delete(
        getDynamicRoute(apiRoute.Feed, {
          query: {
            feedId,
          },
        })
      )
    },
    {
      onSuccess: () => {
        toast({
          title: "방어덱이 제거되었습니다.",
        })
      },
      onSettled: async () => {
        await Promise.all([
          queryClient.invalidateQueries([apiRoute.Feed]),
          queryClient.invalidateQueries([apiRoute.Comment]),
        ])
      },
    }
  )

  return { deleteFeed, isLoading }
}
