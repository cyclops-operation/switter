import z from "zod"

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

export { monsterElement, monsterInfo, type MonsterElement, type MonsterInfo }
