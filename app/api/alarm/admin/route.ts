import { NextRequest, NextResponse } from "next/server"

import { accountRole } from "@/interface/account"

import prisma from "@/lib/prisma"

import { SendAlarmParams, sendAlarm } from "../action"

type PutAlarmAdminPayload = Omit<SendAlarmParams, "receiverIds">

async function PUT(request: NextRequest) {
  const payload: PutAlarmAdminPayload = await request.json()

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
    await sendAlarm({ ...payload, receiverIds: adminIds })
  } catch (error) {
    return NextResponse.json(
      { error: "알림 전송에 실패했습니다." },
      { status: 500 }
    )
  }

  return NextResponse.json({ status: "ok" })
}

export { PUT, type PutAlarmAdminPayload }
