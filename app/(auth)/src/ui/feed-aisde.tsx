"use client"

import PusherDialog from "../../../../components/feed/pusher-dialog"

export default function FeedAside() {
  return (
    <aside className="sticky top-[89px] grid min-h-min w-full max-w-[200px] gap-2 self-start rounded-lg border p-2 shadow-sm">
      <PusherDialog />
    </aside>
  )
}
