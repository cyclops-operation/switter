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

type MonsterInfo = z.infer<typeof monsterInfo>

const monsterList = z
  .array(monsterInfo)
  .min(3, {
    message: formErrorMessage.monsterList.length,
  })
  .max(3, {
    message: formErrorMessage.monsterList.length,
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
      message: formErrorMessage.monsterList.duplicated,
    }
  )

type MonsterList = z.infer<typeof monsterList>

export {
  monsterElement,
  monsterInfo,
  monsterList,
  type MonsterElement,
  type MonsterInfo,
  type MonsterList,
}
