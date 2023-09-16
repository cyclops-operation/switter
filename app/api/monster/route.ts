// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server"

import { MonsterInfo } from "@/interface/monster"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const monsterList = await prisma.monster.findMany()

  return NextResponse.json(monsterList)
}

export async function POST(request: NextRequest) {
  const payload = await request.json()

  await prisma.monster.createMany({
    data: payload,
  })

  return NextResponse.json({ status: "ok" })
}

export async function PATCH(request: NextRequest) {
  const { id, ...payload }: MonsterInfo = await request.json()

  await prisma.monster.upsert({
    where: {
      id,
    },
    create: payload,
    update: payload,
  })

  return NextResponse.json({ status: "ok" })
}
