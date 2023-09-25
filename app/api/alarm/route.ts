import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { getServerAccount } from "@/lib/utils"

async function GET() {
  const session = await getServerAccount()

  const alarms = await prisma.alarm.findMany({
    where: {
      receiverId: session?.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return NextResponse.json(alarms)
}

export { GET }
