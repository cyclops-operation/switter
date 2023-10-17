import z from "zod"

// Base

type TailwindCustomSize = `[${number}${string}]`
type TailwindSize = number | TailwindCustomSize

const commonRange = z.enum(["full", "fit"])
type CommonRange = z.infer<typeof commonRange> | TailwindSize

export {
  commonRange,
  type CommonRange,
  type TailwindCustomSize,
  type TailwindSize,
}
