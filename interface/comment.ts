import { Comment, Feed, User } from "@prisma/client"
import z from "zod"

import { deckMonsterList } from "./monster"

const attackMonster = z.object({
  feedId: z.string().optional(),
  attackMonsterList: deckMonsterList,
})

type AttackMonster = z.infer<typeof attackMonster>

type CommentItem = { author: User; id: number } & { feed: Feed } & Comment

export { attackMonster, type AttackMonster, type CommentItem }
