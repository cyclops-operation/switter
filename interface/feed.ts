import { Feed, User } from "@prisma/client"
import z from "zod"

import { monsterList } from "./monster"

const defenseMonster = z.object({
  keyword: z.string().optional(),
  defencseMonsterList: monsterList,
})

type DefenseMonster = z.infer<typeof defenseMonster>

type FeedList = { author: User } & Feed

export { defenseMonster, type DefenseMonster, type FeedList }
