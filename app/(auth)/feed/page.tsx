import FeedList from "../src/ui/list/feed-list"
import FeedSearch from "../src/ui/search/feed-search"
import CommentSheet from "../src/ui/sheet/comment-sheet"

export default function FeedPage() {
  return (
    <section className="container h-full">
      <FeedSearch />

      <FeedList />

      <CommentSheet />
    </section>
  )
}
