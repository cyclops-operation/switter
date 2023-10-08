import { NextRequest, NextResponse } from "next/server"

import { attackMonster } from "@/interface/comment"
import { MonsterList } from "@/interface/monster"
import { getServerSession } from "next-auth"
import z from "zod"

import prisma from "@/lib/prisma"

import { createApiErrorResponse } from "../action"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const feedId = searchParams.get("feedId")

    await prisma.feed.update({
      where: {
        id: Number(feedId),
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    const commentList = await prisma.comment.findMany({
      where: {
        feedId: Number(feedId),
      },
      include: {
        author: true,
        feed: true,
      },
    })

    // TODO: comment zod 추상화 다시하기
    // const commentList = attackMonster.parse(getCommentList)

    return NextResponse.json(commentList)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest")
    }

    return createApiErrorResponse("ServerError")
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const { feedId, attackMonsterList: monsterList } =
      attackMonster.parse(payload)

    const session = await getServerSession(authOptions)

    if (!session) return createApiErrorResponse("UnAuthorized")

    if (!feedId) return createApiErrorResponse("BadRequest")

    /** 현재 피드에 저장된 코맨트 리스트 */
    const savedCommnetListAtCurrentFeed = (await prisma.feed.findFirst({
      where: {
        id: Number(feedId),
      },
      select: {
        comments: {
          select: {
            monsterList: true,
          },
        },
      },
    })) as { comments: { monsterList: MonsterList }[] }

    const { comments } = savedCommnetListAtCurrentFeed

    /** 등록된 전체 코맨트의 공격덱 몬스터 아이디 배열 */
    const savedCommentMonsterIdList = comments.map(({ monsterList }) =>
      monsterList.map(({ id }) => id).sort()
    )

    /** 현재 등록하는 코맨트의 공격덱 몬스터 아이디 배열 */
    const payloadMonsterListByIdList = monsterList.map(({ id }) => id).sort()

    /** 등록된 전체 코멘트의 방덱 몬스터 아이디 리스트중 현재 등록하는 피드의 몬스터가 정확히 일치하는지 여부 (중복) */
    const isDuplicated = savedCommentMonsterIdList.some((savedMonsterIdList) =>
      savedMonsterIdList.every((monsterId) =>
        payloadMonsterListByIdList.includes(monsterId)
      )
    )

    if (isDuplicated) {
      return createApiErrorResponse("Conflict")
    }

    await prisma.comment.create({
      data: {
        monsterList,
        authorId: session.user.id,
        feedId: Number(feedId),
      },
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest")
    }

    return createApiErrorResponse("ServerError")
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const commentId = searchParams.get("commentId")

    if (!commentId) return createApiErrorResponse("BadRequest")

    await prisma.comment.delete({
      where: {
        id: commentId,
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
