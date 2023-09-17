"use client"

import { ReactNode } from "react"

import FeedAside from "@/components/feed/feed-aisde"

interface FeedLayoutProps {
  children: ReactNode
}

export default function FeedLayout({ children }: FeedLayoutProps) {
  return (
    <div className="container relative grid grid-flow-col grid-cols-layout gap-6 py-6">
      <FeedAside />

      {children}
    </div>
  )
}
