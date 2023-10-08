"use server"

import { apiErrorCode, apiErrorMessage } from "@/lib/error-message"

/** api error reponse 생성 */
function createApiErrorResponse(
  errorType: keyof typeof apiErrorCode,
  errorMessage?: string
) {
  return new Response(errorMessage || apiErrorMessage[errorType], {
    status: apiErrorCode[errorType],
  })
}

export { createApiErrorResponse }
