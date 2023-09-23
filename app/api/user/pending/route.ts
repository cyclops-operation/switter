import { NextRequest, NextResponse } from "next/server"

import { Account, accountStatus } from "@/interface/account"

import prisma from "@/lib/prisma"

import { getPendingUsers } from "./action"

async function GET() {
  const result = await getPendingUsers()
  return NextResponse.json(result)
}

type PatchPendingUserPayload = Pick<Account, "id">

async function PATCH(request: NextRequest) {
  const { id }: PatchPendingUserPayload = await request.json()

  await prisma.user.update({
    where: { id },
    data: {
      status: accountStatus.Enum.ACTIVE,
    },
  })

  return NextResponse.json({ status: "ok" })
}

export { GET, PATCH, type PatchPendingUserPayload }
