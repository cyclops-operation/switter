import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"

import { authOptions } from "../auth/[...nextauth]/route"

/**
 * 로그인 한 유저(현재 세션에 저장되어 있는)의 데이터를 가져옵니다.
 */
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
