import { NextRequest, NextResponse } from "next/server"

import { defenseMonster } from "@/interface/feed"
import { getServerSession } from "next-auth"
import z from "zod"

import { apiErrorMessage } from "@/lib/error-message"
import prisma from "@/lib/prisma"

import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  const monsterList = await prisma.feed.findMany({
    include: { author: true, comments: true },
  })

  return NextResponse.json(monsterList)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { keyword, defencseMonsterList: monsterList } =
      defenseMonster.parse(body)

    const session = await getServerSession(authOptions)

    if (!session)
      return new Response(apiErrorMessage.UnAuthorized, { status: 401 })

    await prisma.feed.create({
      data: {
        keyword,
        monsterList,
        author: {
          connect: { id: session.user.id },
        },
      },
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(apiErrorMessage.ServerError, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const feedId = searchParams.get("feedId")

    if (!feedId)
      return new Response(apiErrorMessage.BadRequest, { status: 400 })

    await prisma.feed.delete({
      where: {
        id: Number(feedId),
      },
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(apiErrorMessage.ServerError, { status: 500 })
  }
}
