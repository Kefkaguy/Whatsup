import { test, before, after } from "node:test"
import assert from "node:assert/strict"
import { MongoMemoryServer } from "mongodb-memory-server"
import { MongoClient } from "mongodb"
import { ideaSchema } from "../lib/idea-schema.mjs"
import { createIdeasHandler } from "../lib/ideas-handler.mjs"
import { describeIdeasFailure, reportIdeasFailure } from "../lib/ideas-diagnostics.mjs"
import { ideaConfigurationIssues } from "../lib/ideas-server.mjs"
import { initializeIndexes, consumeQuota, clientIp, ipDigest, ideaDigest, sameOrigin, verifyTurnstile, submissionsReady, ownerAllowed, publicProjection, serializeIdea } from "../lib/ideas-server.mjs"

let server, client, db
before(async () => {
  server = await MongoMemoryServer.create()
  client = await new MongoClient(server.getUri()).connect()
  db = client.db("ideas_tests")
  await initializeIndexes(db)
})
after(async () => { await client?.close(); await server?.stop() })
const validIdea = { title: "Offline freezer list", description: "Remember what is in the freezer and plan dinners without internet.", category: "Everyday life", author: "", rules: true, website: "", token: "test-token" }

test("strict submissions reject scripts, links, injected fields, invalid category and missing consent", () => {
  assert.equal(ideaSchema.safeParse(validIdea).success, true)
  for (const change of [{ title: "<script>alert(1)</script>" }, { description: "Visit https://example.com for a free prize today" }, { status: "approved" }, { rules: false }, { category: { $ne: "" } }, { description: "tiny" }, { token: "" }]) {
    assert.equal(ideaSchema.safeParse({ ...validIdea, ...change }).success, false)
  }
})
test("forwarded IPs cannot spoof self-hosted limits and Vercel requires its trusted header", () => {
  const req = { headers: { "x-forwarded-for": "1.2.3.4", "x-vercel-forwarded-for": "5.6.7.8" }, socket: { remoteAddress: "::ffff:127.0.0.1" } }
  assert.equal(clientIp(req, {}), "127.0.0.1")
  assert.equal(clientIp(req, { VERCEL: "1" }), "5.6.7.8")
  assert.throws(() => clientIp({ ...req, headers: { "x-forwarded-for": "1.2.3.4" } }, { VERCEL: "1" }))
})
test("IPv6 privacy rotations share a quota, other networks do not, and secrets protect hashes", () => {
  const secret = "a".repeat(32)
  assert.equal(ipDigest("2001:db8::1", secret), ipDigest("2001:db8:0:0:ffff:eeee:1111:2222", secret))
  assert.notEqual(ipDigest("2001:db8:0:1::1", secret), ipDigest("2001:db8::1", secret))
  assert.notEqual(ipDigest("127.0.0.1", secret), ipDigest("127.0.0.1", "b".repeat(32)))
  assert.throws(() => ipDigest("127.0.0.1", "short"))
})
test("writes require the configured canonical origin", () => {
  const env = { NEXTAUTH_URL: "https://kefka.vercel.app" }
  assert.equal(sameOrigin({ headers: { origin: "https://kefka.vercel.app" } }, env), true)
  for (const headers of [{}, { origin: "https://evil.example" }, { origin: "https://kefka.vercel.app.evil.example" }, { origin: "null" }, { origin: "https://kefka.vercel.app", "sec-fetch-site": "cross-site" }]) assert.equal(sameOrigin({ headers }, env), false)
})
test("bot verification rejects bad host/action and failed checks", async () => {
  const env = { NEXTAUTH_URL: "https://kefka.vercel.app", TURNSTILE_SECRET_KEY: "test-secret" }
  const run = result => verifyTurnstile("token", async (_, request) => {
    const payload = JSON.parse(request.body)
    assert.equal(payload.secret, "test-secret")
    assert.equal(payload.response, "token")
    return { ok: true, json: async () => result }
  }, env)
  assert.equal(await run({ success: true, action: "submit-idea", hostname: "kefka.vercel.app" }), true)
  for (const result of [{ success: false }, { success: true, action: "other", hostname: "kefka.vercel.app" }, { success: true, action: "submit-idea", hostname: "evil.example" }]) assert.equal(await run(result), false)
  assert.equal(await verifyTurnstile("token", async () => ({ ok: false }), env), false)
})
test("concurrent requests cannot exceed the shared MongoDB quota", async () => {
  const now = Date.UTC(2026, 9, 7, 12)
  const results = await Promise.all(Array.from({ length: 30 }, () => consumeQuota(db, "same-ip", "daily", 3, 86400000, now)))
  assert.equal(results.filter(result => result.allowed).length, 3)
  assert.equal((await db.collection("idea_limits").findOne({ _id: "same-ip:daily:" + Date.UTC(2026, 9, 7) })).count, 3)
  assert.equal((await consumeQuota(db, "other-ip", "daily", 3, 86400000, now)).allowed, true)
  assert.equal((await consumeQuota(db, "same-ip", "daily", 3, 86400000, now + 86400000)).allowed, true)
  const indexes = await db.collection("idea_limits").indexes()
  assert.equal(indexes.find(index => index.key.expiresAt)?.expireAfterSeconds, 0)
})
test("normalized duplicate submissions are rejected by a real unique index", async () => {
  const first = { ...validIdea, digest: ideaDigest(validIdea), status: "pending", createdAt: new Date() }
  await db.collection("ideas").insertOne(first)
  const duplicate = { ...validIdea, title: "  OFFLINE   FREEZER LIST  " }
  assert.equal(ideaDigest(duplicate), first.digest)
  await assert.rejects(db.collection("ideas").insertOne({ ...duplicate, digest: ideaDigest(duplicate) }), error => error.code === 11000)
})
test("the public query exposes approved content only and strips internal fields", async () => {
  await db.collection("ideas").insertOne({ ...validIdea, title: "Approved idea", digest: "approved", status: "approved", createdAt: new Date(), reviewedAt: new Date(), secret: "never public" })
  await db.collection("ideas").insertOne({ ...validIdea, digest: "rejected", status: "rejected", createdAt: new Date() })
  const documents = await db.collection("ideas").find({ status: "approved" }, { projection: publicProjection }).toArray()
  assert.equal(documents.length, 1)
  const output = serializeIdea(documents[0])
  assert.equal(output.title, "Approved idea")
  for (const field of ["digest", "status", "secret", "reviewedAt", "token"]) assert.equal(field in output, false)
})
test("owner authorization uses a stable ID and configuration fails closed", () => {
  const env = { IDEAS_ADMIN_GITHUB_ID: "123" }
  assert.equal(ownerAllowed("github", 123, env), true)
  assert.equal(ownerAllowed("github", "another-user", env), false)
  assert.equal(ownerAllowed("google", 123, env), false)
  assert.equal(ownerAllowed("github", undefined, {}), false)
  assert.equal(submissionsReady({}), false)
  const ready = { MONGODB_URI: "mongodb://test", TURNSTILE_SECRET_KEY: "secret", NEXT_PUBLIC_TURNSTILE_SITE_KEY: "public", IDEAS_IP_HASH_SECRET: "x".repeat(32), NEXTAUTH_SECRET: "y".repeat(32), NEXTAUTH_URL: "https://kefka.vercel.app", GITHUB_ID: "id", GITHUB_SECRET: "secret", IDEAS_ADMIN_GITHUB_ID: "123" }
  assert.equal(submissionsReady(ready), true)
  for (const key of Object.keys(ready)) assert.equal(submissionsReady({ ...ready, [key]: "" }), false)
})

test("the submission API saves pending ideas, fails closed, and never publishes them automatically", async () => {
  const envKeys = { MONGODB_URI: "mongodb://isolated-tests", TURNSTILE_SECRET_KEY: "test", NEXT_PUBLIC_TURNSTILE_SITE_KEY: "test", IDEAS_IP_HASH_SECRET: "s".repeat(32), NEXTAUTH_SECRET: "a".repeat(32), NEXTAUTH_URL: "https://kefka.vercel.app", GITHUB_ID: "test", GITHUB_SECRET: "test", IDEAS_ADMIN_GITHUB_ID: "123" }
  const saved = Object.fromEntries([...Object.keys(envKeys), "VERCEL"].map(key => [key, process.env[key]]))
  Object.assign(process.env, envKeys); delete process.env.VERCEL
  const request = (body, extra = {}) => ({ method: "POST", headers: { origin: "https://kefka.vercel.app", "content-type": "application/json" }, socket: { remoteAddress: "192.0.2.1" }, body, ...extra })
  const response = () => ({ statusCode: 200, headers: {}, setHeader(key, value) { this.headers[key] = value }, status(code) { this.statusCode = code; return this }, json(value) { this.body = value; return this }, end() { return this } })
  const handler = createIdeasHandler({ database: async () => db, botCheck: async () => true })
  try {
    const idea = { ...validIdea, title: "An offline plant notebook", description: "Track watering dates for houseplants without needing an account or internet." }
    const success = response(); await handler(request(idea), success)
    assert.equal(success.statusCode, 201)
    const record = await db.collection("ideas").findOne({ title: idea.title })
    assert.equal(record.status, "pending")
    for (const field of ["token", "rules", "website", "ip", "ipHash"]) assert.equal(field in record, false)
    const board = response(); await handler({ method: "GET" }, board)
    assert.equal(board.body.ideas.some(item => item.title === idea.title), false)
    await db.collection("ideas").updateOne({ _id: record._id }, { $set: { status: "approved" } })
    const published = response(); await handler({ method: "GET" }, published)
    assert.equal(published.body.ideas.some(item => item.title === idea.title), true)
    const badOrigin = response(); await handler(request(idea, { headers: { origin: "https://evil.example" } }), badOrigin)
    assert.equal(badOrigin.statusCode, 403)
    const honeypot = response(); await handler(request({ ...idea, website: "spam" }), honeypot)
    assert.equal(honeypot.statusCode, 400)
    const duplicate = response(); await handler(request(idea), duplicate)
    assert.equal(duplicate.statusCode, 409)
    const failedBot = createIdeasHandler({ database: async () => db, botCheck: async () => false })
    const denied = response(); await failedBot(request({ ...idea, title: "Never save this bot submission" }), denied)
    assert.equal(denied.statusCode, 400)
    assert.equal(await db.collection("ideas").countDocuments({ title: "Never save this bot submission" }), 0)
    delete process.env.TURNSTILE_SECRET_KEY
    const closed = response(); await handler(request(idea), closed)
    assert.equal(closed.statusCode, 503)
  } finally { for (const [key, value] of Object.entries(saved)) { if (value === undefined) delete process.env[key]; else process.env[key] = value } }
})

test("database diagnostics classify failures and never log driver messages or credentials", () => {
  const connectionError = { name: "MongoServerSelectionError", message: "mongodb+srv://private-user:private-password@example.invalid connection timed out" }
  assert.equal(describeIdeasFailure(connectionError), "mongo-server-unreachable")
  assert.equal(describeIdeasFailure({ code: 18 }), "mongo-authentication-failed")
  assert.equal(describeIdeasFailure({ code: 13 }), "mongo-permission-denied")
  assert.equal(describeIdeasFailure({ name: "MongoParseError" }), "mongo-invalid-connection-string")
  assert.equal(describeIdeasFailure({ message: "querySrv ENOTFOUND private-host" }), "mongo-dns-failed")
  assert.equal(describeIdeasFailure({ name: "MongoServerSelectionError", reason: { servers: new Map([["private-host", { error: { code: 18 } }]]) } }), "mongo-authentication-failed")
  const output = []
  const original = console.error
  console.error = (...items) => output.push(items.join(" "))
  try { reportIdeasFailure("load-board", connectionError) } finally { console.error = original }
  assert.match(output.join(" "), /mongo-server-unreachable/)
  for (const secret of ["private-user", "private-password", "example.invalid", "mongodb"]) assert.equal(output.join(" ").includes(secret), false)
})

test("configuration diagnostics name invalid settings without leaking their values", () => {
  const ready = { MONGODB_URI: "mongodb://test", TURNSTILE_SECRET_KEY: "private-bot-secret", NEXT_PUBLIC_TURNSTILE_SITE_KEY: "public", IDEAS_IP_HASH_SECRET: "x".repeat(32), NEXTAUTH_SECRET: "y".repeat(32), NEXTAUTH_URL: "https://kefka.vercel.app", GITHUB_ID: "id", GITHUB_SECRET: "private-github-secret", IDEAS_ADMIN_GITHUB_ID: "123" }
  assert.deepEqual(ideaConfigurationIssues(ready), [])
  const invalid = { ...ready, IDEAS_IP_HASH_SECRET: "private-short-secret", NEXTAUTH_SECRET: "short", NEXTAUTH_URL: "not-a-url" }
  const issues = ideaConfigurationIssues(invalid)
  assert.equal(issues.length, 3)
  assert.equal(JSON.stringify(issues).includes("private-short-secret"), false)
  assert.equal(submissionsReady({ ...ready, NODE_ENV: "production", VERCEL: "1", NEXTAUTH_URL: "http://localhost:3000" }), false)
  assert.equal(submissionsReady({ ...ready, NEXTAUTH_URL: "https://kefka.vercel.app/ideas" }), false)
})

test("an unavailable database stays closed and returns a generic public error", async () => {
  const previous = process.env.MONGODB_URI
  process.env.MONGODB_URI = "mongodb://isolated-test"
  const reported = []
  try {
    const handler = createIdeasHandler({ database: async () => { throw { name: "MongoServerSelectionError", message: "private credentials" } }, reportFailure: (operation, error) => reported.push({ operation, reason: describeIdeasFailure(error) }) })
    const res = { statusCode: 200, setHeader() {}, status(code) { this.statusCode = code; return this }, json(body) { this.body = body; return this } }
    await handler({ method: "GET" }, res)
    assert.equal(res.statusCode, 503)
    assert.equal(JSON.stringify(res.body).includes("private credentials"), false)
    assert.deepEqual(reported, [{ operation: "load-board", reason: "mongo-server-unreachable" }])
  } finally { if (previous === undefined) delete process.env.MONGODB_URI; else process.env.MONGODB_URI = previous }
})
