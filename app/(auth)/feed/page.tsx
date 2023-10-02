import FeedList from "../src/ui/list/feed-list"
import CommentSheet from "../src/ui/sheet/comment-sheet"

export default function FeedPage() {
  return (
    <section className="container h-full">
      <FeedList />

      <CommentSheet />
    </section>
  )
}
