import { z } from "zod"

export const categories = ["Everyday life", "Home & organization", "Health & wellbeing", "Work & creativity", "Something else"]
const plainText = (min, max) => z.string().trim().min(min).max(max)
  .refine(value => !/[<>]|https?:\/\/|www\./i.test(value), "Please use plain text without links or HTML.")
export const ideaSchema = z.object({
  title: plainText(5, 80),
  description: plainText(30, 1000),
  category: z.enum(categories),
  author: plainText(0, 40).default(""),
  rules: z.literal(true),
  website: z.string().max(200).default(""),
  token: z.string().min(1).max(2048),
}).strict()
