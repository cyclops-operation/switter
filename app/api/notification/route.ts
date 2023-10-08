import { NextRequest, NextResponse } from "next/server"

import { notificationSchema } from "@/interface/notification"
import z from "zod"

import { pusher, pusherChannel, pusherEvent } from "@/lib/pusher"
import { getServerAccount } from "@/lib/utils"

import { createApiErrorResponse } from "../action"

async function POST(request: NextRequest) {
  try {
    const account = await getServerAccount()

    if (!account) return createApiErrorResponse("UnAuthorized")

    const payload = await request.json()

    const notification = notificationSchema.parse(payload)

    await pusher.trigger(pusherChannel.Auth, pusherEvent.SignIn, notification)

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError")
  }
}

export { POST }
