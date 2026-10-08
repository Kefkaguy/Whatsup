import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, Check, Lightbulb, ShieldCheck, WifiOff } from "lucide-react"
import { categories } from "@/lib/idea-schema.mjs"
import IdeaBotCheck from "@/components/IdeaBotCheck"
import Reveal from "@/components/Reveal"
import Footer from "@/components/Footer"

const initial = { title: "", description: "", category: categories[0], author: "", website: "", rules: false }
export default function IdeasPage() {
  const [form, setForm] = useState(initial)
  const [ideas, setIdeas] = useState([])
  const [accepting, setAccepting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [boardError, setBoardError] = useState("")
  const [filter, setFilter] = useState("All ideas")
  const [token, setToken] = useState("")
  const [resetKey, setResetKey] = useState(0)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  async function loadBoard(signal) {
    setLoading(true); setBoardError("")
    try {
      const response = await fetch("/api/ideas", { signal })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setIdeas(data.ideas); setAccepting(data.accepting)
    } catch (error) {
      if (error.name !== "AbortError") { setBoardError("The idea board couldn’t load. Please try again."); setAccepting(false) }
    } finally { if (!signal?.aborted) setLoading(false) }
  }
  useEffect(() => { const controller = new AbortController(); loadBoard(controller.signal); return () => controller.abort() }, [])
  const update = event => setForm(value => ({ ...value, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value }))
  async function submit(event) {
    event.preventDefault()
    if (sending || !accepting || !token) return
    setSending(true); setMessage(""); setSuccess(false)
    try {
      const response = await fetch("/api/ideas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, token }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Please try again later.")
      setMessage(data.message); setSuccess(true); setForm(initial)
    } catch (error) { setMessage(error.message || "We couldn’t save your idea. Please try again later.") }
    finally { setSending(false); setToken(""); setResetKey(value => value + 1) }
  }
  const visibleIdeas = filter === "All ideas" ? ideas : ideas.filter(idea => idea.category === filter)
  return <>
    <Head><title>Offline app ideas | KefCore</title><meta name="description" content="What useful offline app would you love to have? Share an everyday problem and help shape the next KefCore app." /></Head>
    <main className="ideas-page shell">
      <Reveal className="ideas-hero"><div><span className="eyebrow">Small ideas. Real possibilities.</span><h1>The next good app<br />starts with <em>you.</em></h1><p>Something you wish your phone could do—even without internet? Tell us the everyday problem you’d love a simple app to solve.</p><a href="#share-idea" className="button-primary">Share an idea <ArrowRight size={17} /></a></div><div className="idea-orbit" aria-hidden="true"><span className="orbit-label">A little “what if?”</span><Lightbulb size={82} strokeWidth={1.1} /><span className="orbit-tag"><WifiOff size={15} />Offline by design</span><span className="orbit-dot" /></div></Reveal>
      <Reveal className="ideas-steps"><div><span>01</span><h2>Spot a small problem.</h2><p>A daily task that could be easier.</p></div><div><span>02</span><h2>Tell us your idea.</h2><p>No account needed. Just a little thought.</p></div><div><span>03</span><h2>Let it take shape.</h2><p>We review ideas before sharing them here.</p></div></Reveal>
      <section id="share-idea" className="idea-submit-layout">
        <Reveal className="idea-guidance"><span className="eyebrow">Your “wouldn’t it be nice if…”</span><h2>Useful. Simple.<br /><em>Offline.</em></h2><p>You don’t need a finished plan. Describe the problem, who it helps, and what the app could do without an internet connection.</p><div className="idea-example"><span className="eyebrow">For example</span><p>“An app to remember what’s in my freezer, so I can plan dinner without opening every drawer.”</p></div><div className="idea-rules"><ShieldCheck size={22} /><div><h3>A few friendly ground rules</h3><p>No 18+ content, hate, harassment, offensive content, spam, ads, or links. Please keep it kind and don’t include private information.</p><p>Three ideas per day per connection. Every idea is reviewed; submitting doesn’t guarantee publication or development.</p></div></div></Reveal>
        <Reveal className="idea-form-card">
          <div className="form-heading"><Lightbulb size={22} /><h2>What’s your idea?</h2></div>
          {!loading && !accepting && <p className="form-notice">Submissions open soon. Have a look around and start thinking of your idea.</p>}
          <form onSubmit={submit}>
            <fieldset disabled={sending}><label htmlFor="idea-title">Give it a short title <span>Required</span></label><input id="idea-title" name="title" value={form.title} onChange={update} minLength={5} maxLength={80} placeholder="My offline freezer list" required />
              <label htmlFor="idea-category">What’s it for?</label><select id="idea-category" name="category" value={form.category} onChange={update}>{categories.map(category => <option key={category}>{category}</option>)}</select>
              <label htmlFor="idea-description">Tell us how it would help <span>Required</span></label><textarea id="idea-description" name="description" value={form.description} onChange={update} minLength={30} maxLength={1000} rows={6} placeholder="What problem does it solve? What would it do offline?" aria-describedby="idea-description-hint" required /><p id="idea-description-hint" className="input-hint">30–1,000 characters · {form.description.length}/1,000</p>
              <label htmlFor="idea-author">Your name or nickname <span>Optional</span></label><input id="idea-author" name="author" value={form.author} onChange={update} maxLength={40} placeholder="Leave blank to stay anonymous" autoComplete="nickname" />
              <div className="idea-honeypot" aria-hidden="true"><label htmlFor="idea-website">Leave this empty</label><input id="idea-website" name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" /></div>
              <label className="rules-checkbox"><input name="rules" type="checkbox" checked={form.rules} onChange={update} required /><span>I agree to the ground rules and understand my idea and nickname may be public after review.</span></label>
              {accepting && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <IdeaBotCheck onToken={setToken} resetKey={resetKey} />}
              {message && <p className={success ? "form-message is-success" : "form-message"} role={success ? "status" : "alert"}>{success && <Check size={18} />}{message}</p>}
              <button className="button-primary" type="submit" disabled={!accepting || !token || sending}>{sending ? "Saving your idea…" : "Send my idea"}<ArrowRight size={17} /></button>
              <p className="input-hint">Saved online. Reviewed by a human. <Link href="/privacy#website">How we handle your submission</Link></p>
            </fieldset>
          </form>
        </Reveal>
      </section>
      <section className="idea-board" aria-labelledby="idea-board-heading"><Reveal className="section-heading"><div><span className="eyebrow">The community notebook</span><h2 id="idea-board-heading">A place for<br /><em>possibilities.</em></h2></div><p>Ideas from people like you.<br />Reviewed, then shared here.</p></Reveal>
        <div className="idea-filters" aria-label="Filter ideas by category">{["All ideas", ...categories].map(category => <button type="button" key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
        {loading ? <p className="idea-empty" role="status">Opening the notebook…</p> : boardError ? <div className="idea-empty" role="alert"><p>{boardError}</p><button type="button" className="text-link" onClick={() => loadBoard()}>Try again <ArrowRight size={15} /></button></div> : visibleIdeas.length ? <div className="idea-grid">{visibleIdeas.map(idea => <article className="community-idea" key={idea.id}><span className="idea-category">{idea.category}</span><h3>{idea.title}</h3><p>{idea.description}</p><div><span>{idea.author || "An anonymous thinker"}</span><time dateTime={idea.createdAt}>{idea.createdAt.slice(0, 10)}</time></div></article>)}</div> : <div className="idea-empty"><Lightbulb size={30} strokeWidth={1.4} /><h3>{filter === "All ideas" ? "A fresh page, waiting for good ideas." : "No ideas in this corner yet."}</h3><p>Once an idea is approved, it will appear here. Yours could be the first.</p><a href="#share-idea" className="text-link">Start with your idea <ArrowRight size={15} /></a></div>}
      </section>
    </main><Footer />
  </>
}
