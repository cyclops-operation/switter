import { NextRequest, NextResponse } from "next/server"

import { notificationSchema } from "@/interface/notification"
import { getServerSession } from "next-auth"
import z from "zod"

import { apiErrorMessage } from "@/lib/error-message"
import prisma from "@/lib/prisma"
import { pusher, pusherChannel, pusherEvent } from "@/lib/pusher"

import { authOptions } from "../auth/[...nextauth]/route"

async function GET() {
  const notificationList = await prisma.notification.findMany()

  return NextResponse.json(notificationList)
}

async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  const payload = await request.json()

  const {
    type: notificationType,
    title,
    description,
  } = notificationSchema.parse(payload)

  const pusherMessage = {
    Admin: {
      title: `${session?.user.name} 유저가 가입을 신청했습니다.`,
      description: "유저 권한을 확인해주세요.",
    },
    Private: {
      title,
      description,
    },
    Public: {
      title,
      description,
    },
  }[notificationType]

  const signInNotification = await prisma.notification.findFirst({
    where: {
      senderId: session?.user.id,
      type: "Admin",
    },
  })

  const isSignInRequestCountOver =
    signInNotification && signInNotification.count >= 3

  if (!session)
    return new Response(apiErrorMessage.UnAuthorized, { status: 401 })

  if (isSignInRequestCountOver) {
    return new Response(apiErrorMessage.ServerError, { status: 500 })
  }

  try {
    if (signInNotification) {
      await prisma.notification.update({
        where: {
          id: signInNotification.id,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      })
    } else {
      await prisma.notification.create({
        data: {
          type: notificationType,
          senderId: session.user.id,
          ...pusherMessage,
        },
      })
    }

    await pusher.trigger(pusherChannel.Auth, pusherEvent.SignIn, pusherMessage)

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(apiErrorMessage.ServerError, { status: 500 })
  }
}

export { GET, POST }
