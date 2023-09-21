import { NextRequest, NextResponse } from "next/server"

import { Account } from "@/interface/account"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"

import { authOptions } from "../auth/[...nextauth]/route"
import { getSessionAccount } from "./action"

async function GET() {
  const result = await getSessionAccount()
  return NextResponse.json(result)
}

type PostAccountPayload = Pick<Account, "guildName" | "name">

async function POST(request: NextRequest) {
  const payload: PostAccountPayload = await request.json()
  const session = await getServerSession(authOptions)

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
  const result = await getSessionAccount()

  if (result) {
    await prisma.user.update({
      where: {
        id: result.id,
      },
      data: payload,
    })
  } else {
    throw new Error("세션이 없습니다.")
  }

  return NextResponse.json({ status: "ok" })
}

export { GET, PATCH, POST, type PatchAccountPayload, type PostAccountPayload }
