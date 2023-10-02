import { NextRequest, NextResponse } from "next/server"

import { accountRole } from "@/interface/account"

import prisma from "@/lib/prisma"
import { pusher, pusherChannel, pusherEvent } from "@/lib/pusher"

import { SendAlarmParams } from "../action"

type PostAlarmAdminPayload = Omit<SendAlarmParams, "receiverIds">

async function POST(request: NextRequest) {
  const payload: PostAlarmAdminPayload = await request.json()

  const adminIds = await prisma.user
    .findMany({
      where: {
        role: accountRole.Enum.ADMIN,
      },
      select: {
        id: true,
      },
    })
    .then((res) => res.map(({ id }) => id))

  try {
    // await sendAlarm({ ...payload, receiverIds: adminIds })
    await pusher.trigger(pusherChannel.Auth, pusherEvent.SignIn, {
      title: "새로운 유저가 가입을 신청했습니다.",
      description: "유저 권한을 확인해주세요.",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "알림 전송에 실패했습니다." },
      { status: 500 }
    )
  }

  return NextResponse.json({ status: "ok" })
}

export { POST, type PostAlarmAdminPayload }
