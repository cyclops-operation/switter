import z from "zod"

import { formErrorMessage } from "@/lib/error-message"

const requestRowType = z.enum(["FEATURE", "BUG"])

type RequestRowType = z.infer<typeof requestRowType>

const requestRowForm = z.object({
  type: requestRowType,
  title: z.string().min(1, {
    message: formErrorMessage.requestRow.title.length,
  }),
  description: z.string().min(1, {
    message: formErrorMessage.requestRow.description.length,
  }),
})

type RequestRowForm = z.infer<typeof requestRowForm>

export {
  requestRowForm,
  requestRowType,
  type RequestRowForm,
  type RequestRowType,
}
