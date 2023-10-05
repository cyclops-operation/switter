import { NextRequest, NextResponse } from "next/server"

import { requestRowForm } from "@/interface/sheet"
import z from "zod"

import { apiErrorMessage } from "@/lib/error-message"
import { getServerAccount } from "@/lib/utils"

import { loadSpreadsheets } from "./action"

async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { title, description } = requestRowForm.parse(body)

    const sheets = await loadSpreadsheets()

    if (!sheets)
      return new Response(apiErrorMessage.ServerError, { status: 500 })

    const sheet = sheets?.sheetsById[0]

    const account = await getServerAccount()

    if (!account?.user.id)
      return new Response(apiErrorMessage.ServerError, { status: 500 })

    await sheet.addRow({
      requesterId: account?.user.id,
      title,
      description: description ?? "",
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
