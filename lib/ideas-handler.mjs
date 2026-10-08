import { ideaSchema } from "./idea-schema.mjs"
import { getIdeasDb, submissionsReady, sameOrigin, clientIp, ipDigest, ideaDigest, consumeQuota, verifyTurnstile, publicProjection, serializeIdea } from "./ideas-server.mjs"

export function createIdeasHandler({ database = getIdeasDb, botCheck = verifyTurnstile } = {}) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store")
    if (req.method === "GET") {
      if (!process.env.MONGODB_URI) return res.status(200).json({ ideas: [], accepting: false })
      try {
        const db = await database()
        const ideas = await db.collection("ideas").find({ status: "approved" }, { projection: publicProjection }).sort({ createdAt: -1 }).limit(30).toArray()
        return res.status(200).json({ ideas: ideas.map(serializeIdea), accepting: submissionsReady() })
      } catch { return res.status(503).json({ error: "The idea board is taking a short break. Please try again later." }) }
    }
    if (req.method !== "POST") { res.setHeader("Allow", "GET, POST"); return res.status(405).end() }
    if (!sameOrigin(req)) return res.status(403).json({ error: "Please submit using the form on this website." })
    if (!req.headers["content-type"]?.startsWith("application/json")) return res.status(415).json({ error: "Please use the idea form." })
    if (!submissionsReady()) return res.status(503).json({ error: "Submissions open soon. Please check back later." })
    const parsed = ideaSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: "Check the form: a 5–80 character title, 30–1,000 character idea, no links, and agreement to the rules are required." })
    if (parsed.data.website) return res.status(400).json({ error: "We couldn’t submit this idea. Please try again." })
    try {
      const db = await database()
      const identity = ipDigest(clientIp(req))
      const attempt = await consumeQuota(db, identity, "attempt", 6, 60000)
      if (!attempt.allowed) { res.setHeader("Retry-After", attempt.retryAfter); return res.status(429).json({ error: "A few too many attempts. Please wait a minute." }) }
      if (!await botCheck(parsed.data.token)) return res.status(400).json({ error: "The bot check expired or failed. Please complete it again." })
      const quota = await consumeQuota(db, identity, "daily", 3, 86400000)
      if (!quota.allowed) { res.setHeader("Retry-After", quota.retryAfter); return res.status(429).json({ error: "This connection has reached today’s three-idea limit. Please come back tomorrow." }) }
      const { title, description, category, author } = parsed.data
      await db.collection("ideas").insertOne({ title, description, category, author, digest: ideaDigest(parsed.data), status: "pending", createdAt: new Date() })
      return res.status(201).json({ message: "Your idea is saved! We’ll review it before it appears on the board." })
    } catch (error) {
      if (error.code === 11000) return res.status(409).json({ error: "That idea has already been submitted. Thanks for thinking along with us!" })
      return res.status(503).json({ error: "We couldn’t save your idea right now. Please try again later." })
    }
  }
}
