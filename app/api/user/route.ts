import { NextRequest, NextResponse } from "next/server"

import { User } from "@/interface/user"
import { hash } from "bcryptjs"

import prisma from "@/lib/prisma"

import { createApiErrorResponse } from "../action"
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
    return createApiErrorResponse("BadRequest")
  }

  await prisma.user.create({
    data: { token, ...rest },
  })

  return NextResponse.json({ status: "ok" })
}

async function PATCH(request: NextRequest) {
  const {
    id,
    status,
    role,
  }: { id: User["id"]; status?: User["status"]; role?: User["role"] } =
    await request.json()

  if (!id) {
    return createApiErrorResponse("BadRequest")
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
      role,
    },
  })

  return NextResponse.json({ status: "ok" })
}

export { GET, PATCH, POST, type PostUserPayload }
