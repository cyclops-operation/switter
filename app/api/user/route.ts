import { NextRequest, NextResponse } from "next/server"

import { Account } from "@/interface/account"

import prisma from "@/lib/prisma"

import { getPendingUsers } from "./action"

async function GET() {
  const result = await getPendingUsers()
  return NextResponse.json(result)
}

type PatchUserPayload = Pick<Account, "id" | "status">

async function PATCH(request: NextRequest) {
  const { id, status }: PatchUserPayload = await request.json()

  await prisma.user.update({
    where: { id },
    data: {
      status,
    },
  })

  return NextResponse.json({ status: "ok" })
}

export { GET, PATCH, type PatchUserPayload }
