import { NextRequest, NextResponse } from "next/server"

import { requestRowForm } from "@/interface/sheet"
import z from "zod"

import { apiErrorMessage } from "@/lib/error-message"
import { getServerAccount } from "@/lib/utils"

import { loadSpreadsheets } from "./action"

async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const { type, title, description } = requestRowForm.parse(payload)

    const sheets = await loadSpreadsheets()

    if (!sheets)
      return new Response(apiErrorMessage.ServerError, { status: 500 })

    const sheet = sheets?.sheetsById[0]

    const account = await getServerAccount()

    if (!account?.user.id)
      return new Response(apiErrorMessage.ServerError, { status: 500 })

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
      return new Response(error.message, { status: 400 })
    }

    return new Response(apiErrorMessage.ServerError, { status: 500 })
  }
}

export { POST }
