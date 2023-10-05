import z from "zod"

import { formErrorMessage } from "@/lib/error-message"

const requestRowForm = z.object({
  title: z.string().min(1, {
    message: formErrorMessage.requestRow.title.length,
  }),
  description: z.string().min(1, {
    message: formErrorMessage.requestRow.description.length,
  }),
})

type RequestRowForm = z.infer<typeof requestRowForm>

export { requestRowForm, type RequestRowForm }
