import { FeedList } from "@/interface/feed"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"

export default function useFeedList() {
  const { data: feedList = [], isLoading: isFeedListLoading } = useQuery(
    [apiRoute.Feed],
    async () => {
      return await axios.get<FeedList[]>(apiRoute.Feed).then((res) => res.data)
    }
  )

  return { feedList, isFeedListLoading }
}
