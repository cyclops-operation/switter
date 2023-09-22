import { NextResponse } from "next/server"

import { getPendingUsers } from "./action"

async function GET() {
  const result = await getPendingUsers()
  return NextResponse.json(result)
}

export { GET }
