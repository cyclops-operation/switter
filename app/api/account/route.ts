import { NextRequest, NextResponse } from "next/server"

import { Account } from "@/interface/account"

import prisma from "@/lib/prisma"
import { getServerAccount } from "@/lib/utils"

async function GET() {
  const result = await getServerAccount()
  return NextResponse.json(result)
}

type PostAccountPayload = Pick<Account, "guildName" | "name">

async function POST(request: NextRequest) {
  const payload: PostAccountPayload = await request.json()
  const session = await getServerAccount()

  if (session?.user?.email) {
    await prisma.user.create({
      data: {
        ...payload,
        naverKey: session.user.email,
      },
    })
  } else {
    throw new Error("세션이 없습니다.")
  }

  return NextResponse.json({ status: "ok" })
}

type PatchAccountPayload = Pick<Account, "guildName" | "name">

async function PATCH(request: NextRequest) {
  const payload: PatchAccountPayload = await request.json()
  const result = await getServerAccount()

  if (result) {
    await prisma.user.update({
      where: {
        id: result.user.id,
      },
      data: payload,
    })
  } else {
    throw new Error("세션이 없습니다.")
  }

  return NextResponse.json({ status: "ok" })
}

export { GET, PATCH, POST, type PatchAccountPayload, type PostAccountPayload }
