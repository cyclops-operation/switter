import { NextRequest, NextResponse } from "next/server"

import { requestRowForm } from "@/interface/sheet"
import z from "zod"

import { getServerAccount } from "@/lib/utils"

import { createApiErrorResponse } from "../action"
import { loadSpreadsheets } from "./action"

async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const { type, title, description } = requestRowForm.parse(payload)

    const sheets = await loadSpreadsheets()

    if (!sheets) return createApiErrorResponse("ServerError")

    const sheet = sheets?.sheetsById[0]

    const account = await getServerAccount()

    if (!account?.user.id) return createApiErrorResponse("ServerError")

    await sheet.addRow({
      requesterId: account?.user.id,
      nickname: account?.user.nickname,
      type,
      title,
      description,
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiErrorResponse("BadRequest", error.message)
    }

    return createApiErrorResponse("ServerError")
  }
}

export { POST }
