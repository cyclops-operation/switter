import prisma from "@/lib/prisma"

const getUsers = async () => {
  const result = await prisma.user.findMany()
  return result
}

export { getUsers }
