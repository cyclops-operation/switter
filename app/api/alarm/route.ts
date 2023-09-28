import { NextResponse } from "next/server"

import { getMyAlarms } from "./action"

async function GET() {
  const alarms = await getMyAlarms()
  return NextResponse.json(alarms)
}

export { GET }
