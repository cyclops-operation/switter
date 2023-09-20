import * as z from "zod"

const accountStatus = z.enum(["PENDING", "ACTIVE"])
const accountRole = z.enum(["USER", "ADMIN"])

type AccountStatus = z.infer<typeof accountStatus>
type AccountRole = z.infer<typeof accountRole>

const account = z.object({
  id: z.number(),
  guildName: z.string(),
  name: z.string(),
  status: z.enum([accountStatus.Enum.PENDING, accountStatus.Enum.ACTIVE]),
  role: z.enum([accountRole.Enum.USER, accountRole.Enum.ADMIN]),
  post: z.array(
    z.object({
      title: z.string(),
    })
  ), // TODO post 부분 타입 설정 필요
  naverKey: z.string(),
})

type Account = z.infer<typeof account>

export {
  account,
  accountRole,
  accountStatus,
  type Account,
  type AccountRole,
  type AccountStatus,
}
