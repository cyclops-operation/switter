import z from "zod"

// Base

type TailwindCustomSize = `[${number}${string}]`
type TailwindSize = number | TailwindCustomSize

const commonRange = z.enum(["full", "fit"])
type CommonRange = z.infer<typeof commonRange> | TailwindSize

// API

type Params = Record<string, string>

type DynamicRouteParams<P extends Params = {}> = {
  params: P
}

export {
  commonRange,
  type CommonRange,
  type DynamicRouteParams,
  type TailwindCustomSize,
  type TailwindSize,
}
