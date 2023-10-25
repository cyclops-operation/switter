import { readFileSync } from "fs"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const monsterJsonFile = readFileSync("./prisma/monster.json", "utf8")
  const monsterJson = JSON.parse(monsterJsonFile)

  await prisma.monster.createMany({ data: monsterJson })
}

main()
