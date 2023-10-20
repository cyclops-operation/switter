"use server"

import { Prisma } from "@prisma/client"

import { apiErrorCode, apiErrorMessage } from "@/lib/error-message"
import prisma from "@/lib/prisma"

/** api error reponse 생성 */
function createApiErrorResponse(
  errorType: keyof typeof apiErrorCode,
  errorMessage?: string
) {
  return new Response(errorMessage || apiErrorMessage[errorType], {
    status: apiErrorCode[errorType],
  })
}

type ModelKey = Prisma.TypeMap["meta"]["modelProps"]

function findManyDynamic<K extends ModelKey>(tableName: ModelKey) {
  const table = prisma[tableName]

  return prisma[tableName]
}
export { createApiErrorResponse }
