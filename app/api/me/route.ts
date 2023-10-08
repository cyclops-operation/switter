import { NextRequest, NextResponse } from "next/server"

import { User } from "@/interface/user"

import prisma from "@/lib/prisma"
import { getServerAccount } from "@/lib/utils"

async function GET() {
  const account = await getServerAccount()
  return NextResponse.json(account?.user)
}

type PatchMePayload = Partial<Omit<User, "id">>

async function PATCH(request: NextRequest) {
  const payload: PatchMePayload = await request.json()

  const account = await getServerAccount()

  if (!account) throw new Error("로그인 된 유저가 없습니다.")

  await prisma.user.update({
    where: { id: account?.user.id },
    data: payload,
  })

  return NextResponse.json({ status: "ok" })
}

export { GET, PATCH, type PatchMePayload }
