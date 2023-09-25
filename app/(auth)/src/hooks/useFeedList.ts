import { Feed } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"

export default function useFeedList() {
  const { data: feedList = [] } = useQuery([apiRoute.Feed], async () => {
    return await axios.get<Feed[]>(apiRoute.Feed).then((res) => res.data)
  })

  return { feedList }
}
