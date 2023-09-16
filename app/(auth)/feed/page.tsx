"use client"

import MonsterDialog from "@/components/monster-dialog"
import PusherDialog from "@/components/pusher-dialog"

export default function FeedPage() {
  return (
    <section className="container flex h-full items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <PusherDialog />

      <MonsterDialog />
    </section>
  )
}
