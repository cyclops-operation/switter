import { env } from "process"
import { NextRequest, NextResponse } from "next/server"

import { requestRowForm } from "@/interface/sheet"
import { format } from "date-fns"
import z from "zod"

import { getServerAccount } from "@/lib/utils"

import { createApiErrorResponse } from "../action"
import { addRecord } from "./action"

async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const { type, title, description } = requestRowForm.parse(payload)

    const account = await getServerAccount()

    if (!account?.user.id) return createApiErrorResponse("ServerError")

    await addRecord(env.AIRTABLE_CS_TABLE_TITLE ?? "", [
      {
        fields: {
          제목: title,
          설명: description,
          요청자: account?.user.nickname,
          타입: type,
          요청일자: format(new Date(), "yyyy.MM.dd"),
        },
      },
    ])

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError", String(error))
  }
}

export { POST }
