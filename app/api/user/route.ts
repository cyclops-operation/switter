import { NextRequest, NextResponse } from "next/server"

import { User } from "@/interface/user"
import { hash } from "bcryptjs"

import { apiErrorMessage } from "@/lib/error-message"
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

  if (!password || !token) {
    return new Response(apiErrorMessage.BadRequest, { status: 400 })
  }

  await prisma.user.create({
    data: { token, ...rest },
  })

  return NextResponse.json({ status: "ok" })
}

async function PATCH(request: NextRequest) {
  const { id, status }: { id: User["id"]; status: User["status"] } =
    await request.json()

  if (!id || !status) {
    return new Response(apiErrorMessage.BadRequest, { status: 400 })
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })

  return NextResponse.json({ status: "ok" })
}

export { GET, PATCH, POST, type PostUserPayload }
