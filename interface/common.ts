import z from "zod"

// Base

export const commonRange = z.enum(["full", "fit"])
export type CommonRange = z.infer<typeof commonRange> | TailwindSize

// API

type Params = Record<string, string>
type Queries = Record<string, string>

export type DynamicRouteOptions<
  P extends Params = {},
  Q extends Queries = {}
> = {
  params: P
  query: Q
}
