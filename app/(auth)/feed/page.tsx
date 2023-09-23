import FeedAction from "../src/ui/feed-action"
import FeedFilter from "../src/ui/feed-filter"
import FeedList from "../src/ui/feed-list"

export default function FeedPage() {
  return (
    <section className="container p-0">
      <article className="flex flex-col gap-4">
        <FeedFilter />

        <FeedAction />

        <FeedList />
      </article>
    </section>
  )
}
