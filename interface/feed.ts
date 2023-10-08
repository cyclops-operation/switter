import { Comment, Feed, User } from "@prisma/client"
import z from "zod"

import { formErrorMessage } from "@/lib/error-message"

import { monsterList } from "./monster"

const defenseMonster = z.object({
  keyword: z
    .string()
    .min(3, { message: formErrorMessage.keyword.minLength })
    .max(3, { message: formErrorMessage.keyword.maxLength }),
  defencseMonsterList: monsterList,
})

const defenseMonsterSearch = z.object({
  searchTerm: z.string().optional(),
})

type DefenseMonster = z.infer<typeof defenseMonster>

type DefenseMonsterSearch = z.infer<typeof defenseMonsterSearch>

type FeedList = { author: User; comments: Comment[] } & Feed

export {
  defenseMonster,
  defenseMonsterSearch,
  type DefenseMonster,
  type DefenseMonsterSearch,
  type FeedList,
}
