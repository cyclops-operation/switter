import { NextRequest, NextResponse } from "next/server"

import { Account } from "@/interface/account"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)

  const userInfo =
    (
      await prisma.user.findMany({
        where: {
          naverKey: session?.user?.email ?? "",
        },
      })
    )[0] ?? null

  return NextResponse.json(userInfo)
}

export type PostAccountPayload = Pick<Account, "guildName" | "name">

export async function POST(request: NextRequest) {
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

export type PatchAccountPayload = Pick<Account, "guildName" | "name">

export async function PUT(request: NextRequest) {
  const payload: PostAccountPayload = await request.json()
  const session = await getServerSession(authOptions)

  if (session?.user?.email) {
    const userInfo =
      (
        await prisma.user.findMany({
          where: {
            naverKey: session?.user?.email ?? "",
          },
        })
      )[0] ?? null

    if (userInfo === null) {
      throw new Error("해당하는 유저가 없습니다.")
    }

    await prisma.user.update({
      where: {
        id: userInfo.id,
      },
      data: payload,
    })
  } else {
    throw new Error("세션이 없습니다.")
  }

  return NextResponse.json({ status: "ok" })
}
