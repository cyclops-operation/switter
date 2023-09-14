import { NextRequest, NextResponse } from "next/server"

import Pusher from "pusher"

import { pusherChannel, pusherEvent, pusherOptions } from "@/lib/pusher"

const pusher = new Pusher(pusherOptions)

export async function POST(request: NextRequest) {
  const { message }: { message: string } = await request.json()

  await pusher.trigger(pusherChannel.Auth, pusherEvent.SignIn, {
    message,
  })

  return NextResponse.json({ status: "ok" })
}
