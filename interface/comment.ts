import { Comment, Feed, User } from "@prisma/client"
import z from "zod"

import { monsterList } from "./monster"

const attackMonster = z.object({
  feedId: z.string().optional(),
  keyword: z.string().optional(),
  attackMonsterList: monsterList,
})

type AttackMonster = z.infer<typeof attackMonster>

type CommentList = { author: User; id: number } & { feed: Feed } & Comment

export { attackMonster, type AttackMonster, type CommentList }
