import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

import { createApiErrorResponse } from "../../action"

export async function PATCH(request: NextRequest) {
  try {
    const { description }: { description: string } = await request.json()

    const { searchParams } = new URL(request.url)

    const commentId = searchParams.get("commentId")

    if (!commentId) return createApiErrorResponse("BadRequest")

    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        description,
      },
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    return createApiErrorResponse("ServerError")
  }
}
