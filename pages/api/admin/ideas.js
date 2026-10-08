import { getServerSession } from "next-auth/next"
import { ObjectId } from "mongodb"
import { authOptions, adminAuthReady } from "@/lib/auth"
import { getIdeasDb, sameOrigin, serializeIdea } from "@/lib/ideas-server.mjs"
import { reportIdeasFailure } from "@/lib/ideas-diagnostics.mjs"

export const config = { api: { bodyParser: { sizeLimit: "2kb" } } }
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store")
  if (!["GET", "PATCH", "DELETE"].includes(req.method)) { res.setHeader("Allow", "GET, PATCH, DELETE"); return res.status(405).end() }
  if (!adminAuthReady()) return res.status(503).json({ error: "Admin sign-in is not configured." })
  const session = await getServerSession(req, res, authOptions)
  if (!session?.isAdmin) return res.status(401).json({ error: "Owner sign-in required." })
  if (req.method !== "GET" && !sameOrigin(req)) return res.status(403).json({ error: "Please use the review page." })
  try {
    const db = await getIdeasDb()
    const collection = db.collection("ideas")
    if (req.method === "GET") {
      const status = ["pending", "approved", "rejected"].includes(req.query.status) ? req.query.status : "pending"
      const ideas = await collection.find({ status }, { projection: { digest: 0 } }).sort({ createdAt: -1 }).limit(100).toArray()
      return res.status(200).json({ ideas: ideas.map(serializeIdea) })
    }
    if (typeof req.body?.id !== "string" || !/^[a-f0-9]{24}$/.test(req.body.id)) return res.status(400).json({ error: "Invalid idea." })
    const filter = { _id: new ObjectId(req.body.id) }
    if (req.method === "DELETE") {
      const result = await collection.deleteOne(filter)
      return res.status(result.deletedCount ? 200 : 404).json({ success: Boolean(result.deletedCount) })
    }
    if (!["approved", "rejected", "pending"].includes(req.body.status)) return res.status(400).json({ error: "Invalid review decision." })
    const result = await collection.updateOne(filter, { $set: { status: req.body.status, reviewedAt: new Date() } })
    return res.status(result.matchedCount ? 200 : 404).json({ success: Boolean(result.matchedCount) })
  } catch (error) { reportIdeasFailure("moderate", error); return res.status(503).json({ error: "Couldn’t reach the database. Please try again." }) }
}
