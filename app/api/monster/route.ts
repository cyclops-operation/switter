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

    let monsterList = []

    const commonArgs = {
      take: limit,
      skip: limit * (page - 1),
    }

    if (hasSearchTerm) {
      monsterList = await prisma.monster.findMany({
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
        ...commonArgs,
      })
    } else {
      monsterList = await prisma.monster.findMany(commonArgs)
    }

    const parsedMonsterList = z.array(monsterInfo).parse(monsterList)

    return NextResponse.json(parsedMonsterList)
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

export { GET, PATCH, POST }
