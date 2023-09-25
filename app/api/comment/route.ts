import { NextRequest, NextResponse } from "next/server"

import { attackMonster } from "@/interface/comment"
import { getServerSession } from "next-auth"
import z from "zod"

import { apiErrorMessage } from "@/lib/error-message"
import prisma from "@/lib/prisma"

import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const feedId = searchParams.get("feedId")

  const monsterList = await prisma.comment.findMany({
    where: {
      feedId: Number(feedId),
    },
    include: {
      author: true,
      feed: true,
    },
  })

  return NextResponse.json(monsterList)
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const {
      keyword,
      attackMonsterList: monsterList,
      feedId,
    } = attackMonster.parse(payload)

    const session = await getServerSession(authOptions)

    if (!session)
      return new Response(apiErrorMessage.UnAuthorized, { status: 401 })
    if (!feedId)
      return new Response(apiErrorMessage.BadRequest, { status: 400 })

    await prisma.comment.create({
      data: {
        keyword,
        monsterList,
        authorId: session.user.id,
        feedId: Number(feedId),
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
