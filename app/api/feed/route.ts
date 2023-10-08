import { NextRequest, NextResponse } from "next/server"

import { defenseMonster, defenseMonsterSearch } from "@/interface/feed"
import { MonsterList } from "@/interface/monster"
import { getServerSession } from "next-auth"
import z from "zod"

import prisma from "@/lib/prisma"

import { createApiErrorResponse } from "../action"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const searchTerm = searchParams.get("searchTerm") || ""

  const { success: hasSearchTerm } = defenseMonsterSearch.safeParse({
    searchTerm,
  })

  if (hasSearchTerm) {
    const monsterList = await prisma.feed.findMany({
      where: {
        OR: [
          {
            monsterList: {
              path: "$[*].keyword",
              array_contains: searchTerm,
            },
          },
          {
            monsterList: {
              path: "$[*].monsterName",
              array_contains: searchTerm,
            },
          },
          {
            keyword: {
              contains: searchTerm,
            },
          },
        ],
      },
      include: { author: true, comments: true },
    })

    return NextResponse.json(monsterList)
  }

  const monsterList = await prisma.feed.findMany({
    include: { author: true, comments: true },
  })

  return NextResponse.json(monsterList)
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const { keyword, defencseMonsterList: monsterList } =
      defenseMonster.parse(payload)

    const session = await getServerSession(authOptions)

    if (!session) return createApiErrorResponse("UnAuthorized")

    /** 등록된 전체 피드의 방덱 몬스터 리스트 */
    const allFeedMonsterList = (await prisma.feed.findMany({
      select: {
        monsterList: true,
      },
    })) as { monsterList: MonsterList }[]

    /** 등록된 전체 피드의 방덱 몬스터 아이디 배열 */
    const allFeedMonsterListByIdList = allFeedMonsterList.map(
      ({ monsterList }) => monsterList.map(({ id }) => id).sort()
    )

    /** 현재 등록하는 피드의 방덱 몬스터 아이디 배열 */
    const payloadMonsterListByIdList = monsterList.map(({ id }) => id).sort()

    /** 등록된 전체 피드의 방덱 몬스터 아이디 리스트중 현재 등록하는 피드의 몬스터가 정확히 일치하는지 여부 (중복) */
    const isDuplicated = allFeedMonsterListByIdList.some((savedMonsterIdList) =>
      savedMonsterIdList.every((monsterId) =>
        payloadMonsterListByIdList.includes(monsterId)
      )
    )

    if (isDuplicated) {
      return createApiErrorResponse("Conflict")
    }

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
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError")
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const feedId = searchParams.get("feedId")

    if (!feedId) return createApiErrorResponse("BadRequest")

    await prisma.feed.delete({
      where: {
        id: Number(feedId),
      },
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError")
  }
}
