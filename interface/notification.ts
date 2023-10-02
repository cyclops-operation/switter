import { NotificationEvent } from "@prisma/client"
import z from "zod"

const notificationSchema = z.object({
  type: z.enum([
    NotificationEvent.Public,
    NotificationEvent.Private,
    NotificationEvent.Admin,
  ]),
  title: z.string().optional(),
  description: z.string().optional(),
})

type NotificationType = z.infer<typeof notificationSchema>

export { notificationSchema, type NotificationType }
