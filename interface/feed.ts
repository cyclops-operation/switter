import { Comment, Feed, User } from "@prisma/client"
import z from "zod"

import { formErrorMessage } from "@/lib/error-message"

import { deckMonsterList } from "./monster"

const tabType = z.enum(["all", "bookmark"])

const defenseMonster = z.object({
  keyword: z
    .string()
    .min(3, { message: formErrorMessage.keyword.minLength })
    .max(3, { message: formErrorMessage.keyword.maxLength }),
  defencseMonsterList: deckMonsterList,
})

const defenseMonsterSearch = z.object({
  searchTerm: z.string().optional(),
})

type DefenseMonster = z.infer<typeof defenseMonster>

type DefenseMonsterSearch = z.infer<typeof defenseMonsterSearch>

type FeedItem = { author: User; comments: Comment[] } & Feed

type FeedTabType = z.infer<typeof tabType>

export {
  defenseMonster,
  defenseMonsterSearch,
  tabType,
  type DefenseMonster,
  type DefenseMonsterSearch,
  type FeedItem,
  type FeedTabType,
}
