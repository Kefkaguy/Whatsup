import { createHash, createHmac } from "node:crypto"
import { isIP } from "node:net"
import { MongoClient } from "mongodb"

export function submissionsReady(env = process.env) {
  return Boolean(env.MONGODB_URI && env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
    env.IDEAS_IP_HASH_SECRET?.length >= 32 && env.NEXTAUTH_URL && env.GITHUB_ID &&
    env.GITHUB_SECRET && /^[1-9]\d*$/.test(env.IDEAS_ADMIN_GITHUB_ID || "") && env.NEXTAUTH_SECRET?.length >= 32)
}
export async function getIdeasDb() {
  if (!process.env.MONGODB_URI) throw new Error("Ideas database is not configured")
  const cache = globalThis.__kefcoreIdeasMongo ||= {}
  if (!cache.promise) {
    const client = new MongoClient(process.env.MONGODB_URI, { maxPoolSize: 5, serverSelectionTimeoutMS: 5000 })
    cache.promise = client.connect().then(async connection => {
      const db = connection.db(process.env.MONGODB_DB || "kefcore")
      await initializeIndexes(db)
      return db
    }).catch(async error => { cache.promise = null; await client.close(); throw error })
  }
  return cache.promise
}
export async function initializeIndexes(db) {
  await Promise.all([
    db.collection("ideas").createIndex({ digest: 1 }, { unique: true }),
    db.collection("ideas").createIndex({ status: 1, createdAt: -1 }),
    db.collection("idea_limits").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ])
}
export function sameOrigin(req, env = process.env) {
  try {
    const expected = new URL(env.NEXTAUTH_URL).origin
    return typeof req.headers.origin === "string" && new URL(req.headers.origin).origin === expected &&
      req.headers["sec-fetch-site"] !== "cross-site"
  } catch { return false }
}
export function clientIp(req, env = process.env) {
  const value = env.VERCEL === "1" ? req.headers["x-vercel-forwarded-for"] : req.socket?.remoteAddress
  const ip = typeof value === "string" ? value.split(",")[0].trim() : ""
  if (!isIP(ip)) throw new Error("Client address unavailable")
  // Normalize IPv4-mapped IPv6 to avoid giving one address two quotas.
  return ip.startsWith("::ffff:") && isIP(ip.slice(7)) === 4 ? ip.slice(7) : ip
}
export function ipDigest(ip, secret = process.env.IDEAS_IP_HASH_SECRET) {
  if (!secret || secret.length < 32) throw new Error("Rate-limit secret missing")
  // Group IPv6 privacy addresses by /64 to prevent trivial address rotation.
  let key = ip
  if (isIP(ip) === 6) {
    const [head, tail] = ip.split("::")
    const left = head ? head.split(":") : []
    const right = tail ? tail.split(":") : []
    const parts = tail === undefined ? left : [...left, ...Array(8 - left.length - right.length).fill("0"), ...right]
    key = parts.slice(0, 4).map(part => parseInt(part, 16).toString(16)).join(":")
  }
  return createHmac("sha256", secret).update(key).digest("hex")
}
export function ownerAllowed(provider, githubId, env = process.env) {
  return provider === "github" && /^[1-9]\d*$/.test(env.IDEAS_ADMIN_GITHUB_ID || "") &&
    String(githubId) === env.IDEAS_ADMIN_GITHUB_ID
}
export function ideaDigest(idea) {
  return createHash("sha256").update([idea.title, idea.description].map(text => text.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim()).join("\n")).digest("hex")
}
// Atomic capped counters work across serverless instances; a unique _id prevents upsert races.
export async function consumeQuota(db, identity, bucket, limit, windowMs, now = Date.now()) {
  const start = Math.floor(now / windowMs) * windowMs
  const id = identity + ":" + bucket + ":" + start
  try {
    const result = await db.collection("idea_limits").findOneAndUpdate(
      { _id: id, count: { $lt: limit } },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(start + windowMs + 86400000) } },
      { upsert: true, returnDocument: "after" },
    )
    return { allowed: Boolean(result), retryAfter: Math.ceil((start + windowMs - now) / 1000) }
  } catch (error) {
    if (error.code === 11000) return { allowed: false, retryAfter: Math.ceil((start + windowMs - now) / 1000) }
    throw error
  }
}
export async function verifyTurnstile(token, fetcher = fetch, env = process.env) {
  const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) return false
  const result = await response.json()
  return result.success === true && result.action === "submit-idea" &&
    result.hostname === new URL(env.NEXTAUTH_URL).hostname
}
export const publicProjection = { _id: 1, title: 1, description: 1, category: 1, author: 1, createdAt: 1 }
export function serializeIdea(idea) {
  return { id: idea._id.toString(), title: idea.title, description: idea.description, category: idea.category,
    author: idea.author || "", createdAt: idea.createdAt.toISOString(), ...(idea.status ? { status: idea.status } : {}) }
}
