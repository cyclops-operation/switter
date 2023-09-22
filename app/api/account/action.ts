import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"

import { authOptions } from "../auth/[...nextauth]/route"

const getSessionAccount = async () => {
  const session = await getServerSession(authOptions)

  const result = session?.user?.email
    ? await prisma.user.findFirst({
        where: {
          naverKey: session?.user?.email,
        },
      })
    : null

  return result
}

export { getSessionAccount }
