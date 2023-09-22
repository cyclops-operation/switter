import { accountStatus } from "@/interface/account"

import prisma from "@/lib/prisma"

const getPendingUsers = async () => {
  const result = await prisma.user.findMany({
    where: {
      status: accountStatus.Enum.PENDING,
    },
  })

  return result
}

export { getPendingUsers }
