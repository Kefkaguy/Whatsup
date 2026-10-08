import { createIdeasHandler } from "@/lib/ideas-handler.mjs"

export const config = { api: { bodyParser: { sizeLimit: "8kb" } } }
export default createIdeasHandler()
