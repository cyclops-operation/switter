import z from "zod"

const commonRange = z.enum(["full", "fit"])
type CommonRange = z.infer<typeof commonRange>

export { commonRange, type CommonRange }
