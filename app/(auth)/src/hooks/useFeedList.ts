import { useSearchParams } from "next/navigation"

import { FeedList } from "@/interface/feed"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { getDynamicRoute } from "@/lib/utils"

export default function useFeedList() {
  const searchParams = useSearchParams()

  const searchTerm = searchParams.get("searchTerm")

  const { data: feedList = [], isLoading: isFeedListLoading } = useQuery(
    [apiRoute.Feed, searchTerm],
    async () => {
      const url = getDynamicRoute(apiRoute.Feed, {
        query: {
          searchTerm,
        },
      })

      return await axios.get<FeedList[]>(url).then((res) => res.data)
    }
  )

  return { feedList, isFeedListLoading }
}
