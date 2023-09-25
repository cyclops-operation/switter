import { useSearchParams } from "next/navigation"

import { CommentList } from "@/interface/comment"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"

export default function useCommentList() {
  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const { data: commentList } = useQuery(
    [apiRoute.Comment, feedId],
    async () => {
      return await axios
        .get<CommentList[]>(`${apiRoute.Comment}?feedId=${feedId}`)
        .then((res) => res.data)
    },
    { enabled: Boolean(feedId) }
  )

  return { commentList }
}
