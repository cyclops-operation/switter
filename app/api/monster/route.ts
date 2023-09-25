// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server"

import { monsterInfo } from "@/interface/monster"
import z from "zod"

import { apiErrorMessage } from "@/lib/error-message"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const getMonster = await prisma.monster.findMany()

    const allMonster = z.array(monsterInfo).parse(getMonster)

    return NextResponse.json(allMonster)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(apiErrorMessage.ServerError, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
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
      return new Response(error.message, { status: 400 })
    }

    return new Response(apiErrorMessage.ServerError, { status: 500 })
  }
}
