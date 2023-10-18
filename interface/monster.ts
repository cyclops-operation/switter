import z from "zod"

import { formErrorMessage } from "@/lib/error-message"

const monsterElement = z.enum(["dark", "light", "fire", "water", "wind"])

type MonsterElement = z.infer<typeof monsterElement>

const monsterInfo = z.object({
  id: z.number().optional(),
  originName: z.string(),
  monsterName: z.string().nullable(),
  elementType: z
    .enum([
      monsterElement.Enum.dark,
      monsterElement.Enum.light,
      monsterElement.Enum.fire,
      monsterElement.Enum.water,
      monsterElement.Enum.wind,
    ])
    .nullable(),
  keyword: z.array(z.string()),
})

const monsterSearch = z.object({
  searchTerm: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
})

type MonsterInfo = z.infer<typeof monsterInfo>

type MonsterSearch = z.infer<typeof monsterSearch>

const deckMonsterList = z
  .array(monsterInfo)
  .min(3, {
    message: formErrorMessage.deckMonsterList.length,
  })
  .max(3, {
    message: formErrorMessage.deckMonsterList.length,
  })
  .refine(
    (monster) => {
      // 중복몬스터 검증
      const monsterMap = new Map()

      monster.map(({ originName, monsterName }) =>
        monsterMap.set(originName, monsterName)
      )

      return monsterMap.size === monster.length
    },
    {
      message: formErrorMessage.deckMonsterList.duplicated,
    }
  )

type DeckMonsterList = z.infer<typeof deckMonsterList>

export {
  deckMonsterList,
  monsterElement,
  monsterInfo,
  monsterSearch,
  type DeckMonsterList,
  type MonsterElement,
  type MonsterInfo,
  type MonsterSearch,
}
