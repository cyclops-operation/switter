import { NextRequest, NextResponse } from "next/server"

import { User } from "@/interface/user"
import { hash } from "bcryptjs"

import prisma from "@/lib/prisma"

import { getUsers } from "./action"

async function GET() {
  const result = await getUsers()
  return NextResponse.json(result)
}

type PostUserPayload = Omit<User, "id" | "token"> & {
  password: string
}

async function POST(request: NextRequest) {
  const { password, ...rest }: PostUserPayload = await request.json()

  const token = await hash(password, 10)

  await prisma.user.create({
    data: { token, ...rest },
  })

  return NextResponse.json({ status: "ok" })
}

export { GET, POST, type PostUserPayload }
