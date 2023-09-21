import z from "zod"

// Base

type TailwindCustomSize = `[${number}${string}]`
type TailwindSize = number | TailwindCustomSize

const commonRange = z.enum(["full", "fit"])
type CommonRange = z.infer<typeof commonRange> | TailwindSize

// API

type Params = Record<string, string>
type Queries = Record<string, string>

type DynamicRouteOptions<P extends Params = {}, Q extends Queries = {}> = {
  params: P
  query: Q
}

export {
  commonRange,
  type CommonRange,
  type DynamicRouteOptions,
  type TailwindCustomSize,
  type TailwindSize,
}
