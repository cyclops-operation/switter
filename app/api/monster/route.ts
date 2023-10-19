// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server"

import { monsterInfo, monsterSearch } from "@/interface/monster"
import z from "zod"

import prisma from "@/lib/prisma"

import { createApiErrorResponse } from "../action"

async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const searchTerm = searchParams.get("searchTerm") || ""
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : 10

    const { success: hasSearchTerm } = monsterSearch.safeParse({
      searchTerm,
    })

    let list = []
    let total

    const commonArgs = {
      take: limit,
      skip: limit * (page - 1),
    }

    if (hasSearchTerm) {
      const keywordArgs = {
        where: {
          OR: [
            {
              monsterName: {
                contains: searchTerm,
              },
            },
            {
              originName: {
                contains: searchTerm,
              },
            },
          ],
        },
      }

      const [monsters, count] = await prisma.$transaction([
        prisma.monster.findMany({ ...keywordArgs, ...commonArgs }),
        prisma.monster.count(keywordArgs),
      ])

      list = monsters
      total = count
    } else {
      const [monsters, count] = await prisma.$transaction([
        prisma.monster.findMany(commonArgs),
        prisma.monster.count(),
      ])

      list = monsters
      total = count
    }

    const parsedMonsterList = z.array(monsterInfo).parse(list)

    return NextResponse.json({ list: parsedMonsterList, total })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError")
  }
}

async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const payload = monsterInfo.parse(body)

    await prisma.monster.create({
      data: payload,
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError")
  }
}

async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()

    const { id, ...payload } = monsterInfo.parse(body)

    await prisma.monster.upsert({
      where: {
        id,
      },
      create: payload,
      update: payload,
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError")
  }
}

async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get("id") && Number(searchParams.get("id"))

    if (id) {
      await prisma.monster.delete({
        where: {
          id,
        },
      })
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError")
  }
}

export { DELETE, GET, PATCH, POST }
