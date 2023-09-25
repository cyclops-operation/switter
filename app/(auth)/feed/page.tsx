import FeedAction from "../src/ui/feed-action"
import FeedList from "../src/ui/feed-list/feed-list"

export default function FeedPage() {
  return (
    <section className="container p-0">
      <article className="flex flex-col gap-5">
        <FeedAction />

        <FeedList />
      </article>
    </section>
  )
}
