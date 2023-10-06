import { NextRequest, NextResponse } from "next/server"

import { notificationSchema } from "@/interface/notification"
import z from "zod"

import { apiErrorMessage } from "@/lib/error-message"
import { pusher, pusherChannel, pusherEvent } from "@/lib/pusher"
import { getServerAccount } from "@/lib/utils"

async function POST(request: NextRequest) {
  try {
    const account = await getServerAccount()

    if (!account)
      return new Response(apiErrorMessage.UnAuthorized, { status: 401 })

    const payload = await request.json()

    const notification = notificationSchema.parse(payload)

    await pusher.trigger(pusherChannel.Auth, pusherEvent.SignIn, notification)

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(apiErrorMessage.ServerError, { status: 500 })
  }
}

export { POST }
