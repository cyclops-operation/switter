import z from "zod"

import { pageRoute } from "@/lib/page-route"

const notificationSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.enum([pageRoute.Admin.Request]),
})

type NotificationType = z.infer<typeof notificationSchema>

export { notificationSchema, type NotificationType }
