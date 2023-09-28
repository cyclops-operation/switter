import { NextRequest, NextResponse } from "next/server"

import { Alarm } from "@/interface/alarm"
import { DynamicRouteParams } from "@/interface/common"

import prisma from "@/lib/prisma"

type SingleAlarmParams = {
  id: string
}

type PatchSingleAlarmPayload = Omit<Alarm, "id" | "receiver">

async function PATCH(
  request: NextRequest,
  response: DynamicRouteParams<SingleAlarmParams>
) {
  const payload: PatchSingleAlarmPayload = await request.json()
  const { id } = response.params

  try {
    await prisma.alarm.update({
      where: {
        id: Number(id),
      },
      data: payload,
    })
  } catch {
    return NextResponse.json({ error: "에러 발생" })
  }

  return NextResponse.json({ status: "ok" })
}

export { PATCH, type PatchSingleAlarmPayload }
