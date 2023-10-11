import { base } from "@/lib/airtable"

async function addRecord(
  tableName: string,
  records: Record<"fields", Record<string, string>>[]
) {
  const table = base(tableName)
  await table.create(records)
}

export { addRecord }
