import { Comment, Feed, User } from "@prisma/client"
import z from "zod"

import { monsterList } from "./monster"

const defenseMonster = z.object({
  keyword: z.string().optional(),
  defencseMonsterList: monsterList,
})

type DefenseMonster = z.infer<typeof defenseMonster>

type FeedList = { author: User; comments: Comment[] } & Feed

export { defenseMonster, type DefenseMonster, type FeedList }
