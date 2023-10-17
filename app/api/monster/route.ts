// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server"

import { monsterInfo } from "@/interface/monster"
import z from "zod"

import prisma from "@/lib/prisma"

import { createApiErrorResponse } from "../action"

async function GET(request: NextRequest) {
  try {
    const getMonsterList = await prisma.monster.findMany()

    const monsterList = z.array(monsterInfo).parse(getMonsterList)

    return NextResponse.json(monsterList)
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
