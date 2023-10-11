import { env } from "process"

import Airtable from "airtable"

const endpointUrl = "https://api.airtable.com"

const base = new Airtable({
  endpointUrl,
  apiKey: env.AIRTABLE_API_KEY,
}).base(env.AIRTABLE_BASE ?? "")

export { base }
