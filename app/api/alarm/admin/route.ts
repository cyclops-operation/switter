import { NextRequest, NextResponse } from "next/server"

import { userRole } from "@/interface/user"

import prisma from "@/lib/prisma"

import { SendAlarmParams, sendAlarm } from "../action"

type PostAlarmAdminPayload = Omit<SendAlarmParams, "receiverIds">

async function POST(request: NextRequest) {
  const payload: PostAlarmAdminPayload = await request.json()

  const adminIds = await prisma.user
    .findMany({
      where: {
        role: userRole.Enum.ADMIN,
      },
      select: {
        id: true,
      },
    })
    .then((res) => res.map(({ id }) => id))

  try {
    await sendAlarm({ ...payload, receiverIds: adminIds })
  } catch (error) {
    return NextResponse.json(
      { error: "알림 전송에 실패했습니다." },
      { status: 500 }
    )
  }

  return NextResponse.json({ status: "ok" })
}

export { POST, type PostAlarmAdminPayload }
