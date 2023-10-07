import * as z from "zod"

import { account } from "./user"

const alarm = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isRead: z.boolean(),
  eventType: z.string(),
  receiver: account,
  receiverId: z.number(),
})

type Alarm = z.infer<typeof alarm>

export { alarm, type Alarm }
