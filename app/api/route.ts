// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const payload = await request.json()

  await prisma.user.create({
    data: payload,
  })

  return NextResponse.json({ status: "ok" })
}
