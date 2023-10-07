import { useSearchParams } from "next/navigation"

import { FeedList } from "@/interface/feed"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"

export default function useFeedList() {
  const searchParams = useSearchParams()

  const searchTerm = searchParams.get("searchTerm")

  const { data: feedList = [], isLoading: isFeedListLoading } = useQuery(
    [apiRoute.Feed, searchTerm],
    async () => {
      const hasSearchTerm = Boolean(searchTerm)

      const url = hasSearchTerm
        ? `${apiRoute.Feed}?searchTerm=${searchTerm}`
        : apiRoute.Feed

      return await axios.get<FeedList[]>(url).then((res) => res.data)
    }
  )

  return { feedList, isFeedListLoading }
}
