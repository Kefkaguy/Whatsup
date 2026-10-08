import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { adminAuthReady, authOptions } from "@/lib/auth"

export async function getServerSideProps({ req, res }) {
  res.setHeader("Cache-Control", "private, no-store")
  const authReady = adminAuthReady()
  const session = authReady ? await getServerSession(req, res, authOptions) : null
  return { props: { authReady, isAdmin: Boolean(session?.isAdmin) } }
}
export default function IdeaAdmin({ authReady, isAdmin }) {
  const [status, setStatus] = useState("pending")
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(false)
  const [busy, setBusy] = useState("")
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [confirmDelete, setConfirmDelete] = useState("")
  async function load(signal) {
    setLoading(true); setError("")
    try {
      const response = await fetch("/api/admin/ideas?status=" + status, { signal })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setIdeas(data.ideas)
    } catch (error) { if (error.name !== "AbortError") setError(error.message) }
    finally { if (!signal?.aborted) setLoading(false) }
  }
  useEffect(() => { if (!isAdmin) return; const controller = new AbortController(); load(controller.signal); return () => controller.abort() }, [status, isAdmin])
  async function decide(id, decision) {
    setBusy(id); setError(""); setNotice("")
    try {
      const response = await fetch("/api/admin/ideas", { method: decision === "delete" ? "DELETE" : "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: decision }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "This idea was not found.")
      setIdeas(items => items.filter(idea => idea.id !== id)); setConfirmDelete("")
      setNotice(decision === "delete" ? "Idea permanently deleted." : "Review saved.")
      await load()
    } catch (error) { setError(error.message) }
    finally { setBusy("") }
  }
  return <><Head><title>Idea review | KefCore</title><meta name="robots" content="noindex,nofollow" /></Head><main className="admin-page shell"><Link href="/ideas" className="text-link">← Back to the idea board</Link><span className="eyebrow">Owner workspace</span><h1>Idea review.</h1>
    {!isAdmin ? <div className="idea-form-card"><h2>Private review queue</h2><p>Only the configured owner account can access submissions and publish them.</p>{authReady ? <button className="button-primary" onClick={() => signIn("github", { callbackUrl: "/admin/ideas" })}>Sign in with GitHub</button> : <p className="form-notice">Owner sign-in is awaiting configuration.</p>}</div> : <><div className="admin-toolbar"><div className="idea-filters">{["pending", "approved", "rejected"].map(value => <button key={value} disabled={Boolean(busy)} aria-pressed={status === value} onClick={() => { setStatus(value); setNotice(""); setConfirmDelete("") }}>{value}</button>)}</div><button type="button" className="text-link" onClick={() => signOut({ callbackUrl: "/ideas" })}>Sign out</button></div>
      {error && <div className="form-message" role="alert">{error}<button className="text-link" onClick={() => load()}>Retry</button></div>}{notice && <p className="form-message is-success" role="status">{notice}</p>}
      {loading ? <p role="status">Loading submissions…</p> : !error && !ideas.length ? <p className="idea-empty">No {status} ideas right now.</p> : <div className="idea-grid">{ideas.map(idea => <article className="community-idea" key={idea.id}><span className="idea-category">{idea.category}</span><h2>{idea.title}</h2><p>{idea.description}</p><div><span>{idea.author || "Anonymous"}</span><time dateTime={idea.createdAt}>{idea.createdAt.slice(0, 10)}</time></div><div className="admin-decisions">{status !== "approved" && <button disabled={Boolean(busy)} onClick={() => decide(idea.id, "approved")}>Publish</button>}{status !== "rejected" && <button disabled={Boolean(busy)} onClick={() => decide(idea.id, "rejected")}>Reject / unpublish</button>}{confirmDelete === idea.id ? <><button disabled={Boolean(busy)} onClick={() => decide(idea.id, "delete")}>Confirm permanent delete</button><button disabled={Boolean(busy)} onClick={() => setConfirmDelete("")}>Cancel</button></> : <button disabled={Boolean(busy)} onClick={() => setConfirmDelete(idea.id)}>Delete</button>}</div></article>)}</div>}
    </>}
  </main></>
}
