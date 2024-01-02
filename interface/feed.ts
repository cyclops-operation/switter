import { Comment, Feed, User } from "@prisma/client"
import z from "zod"

import { formErrorMessage } from "@/lib/error-message"

import { deckMonsterList } from "./monster"

const defenseMonster = z.object({
  keyword: z
    .string()
    .max(3, { message: formErrorMessage.keyword.maxLength })
    .optional(),
  defencseMonsterList: deckMonsterList,
})

const defenseMonsterSearch = z.object({
  searchTerm: z.string().optional(),
})

type DefenseMonster = z.infer<typeof defenseMonster>

type DefenseMonsterSearch = z.infer<typeof defenseMonsterSearch>

type FeedItem = { author: User; comments: Comment[] } & Feed

export {
  defenseMonster,
  defenseMonsterSearch,
  type DefenseMonster,
  type DefenseMonsterSearch,
  type FeedItem,
}
