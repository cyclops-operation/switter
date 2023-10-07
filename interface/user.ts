import * as z from "zod"

const userStatus = z.enum(["PENDING", "ACTIVE"])
const userRole = z.enum(["USER", "ADMIN"])

type UserStatus = z.infer<typeof userStatus>
type UserRole = z.infer<typeof userRole>

const user = z.object({
  id: z.number(),
  email: z.string(),
  token: z.string(),
  guildName: z.string(),
  nickname: z.string(),
  status: z.enum([userStatus.Enum.PENDING, userStatus.Enum.ACTIVE]),
  role: z.enum([userRole.Enum.USER, userRole.Enum.ADMIN]),
})

type User = z.infer<typeof user>

export { user, userRole, userStatus, type User, type UserRole, type UserStatus }
