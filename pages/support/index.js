import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Plus, Search } from "lucide-react"
import { apps } from "@/lib/apps"
import Reveal from "@/components/Reveal"
import Footer from "@/components/Footer"

export default function SupportCenter() {
  const [query, setQuery] = useState("")
  const search = query.trim().toLowerCase()
  const questions = apps.flatMap(app => app.faq.map(item => ({ ...item, app }))).filter(item =>
    [item.app.name, item.question, ...(Array.isArray(item.answer) ? item.answer : [item.answer])].join(" ").toLowerCase().includes(search)
  )
  const filteredApps = apps.filter(app => [app.name, app.summary, app.supportIntro].join(" ").toLowerCase().includes(search))
  return (
    <>
      <Head><title>Support | KefCore</title><meta name="description" content="Find answers and personal support for SpendPause, BoxSpot, LiftCore, and PetCare+." /></Head>
      <main className="support-page shell">
        <Reveal><span className="eyebrow">A human on the other end</span><h1>Let’s make things simple.</h1><p className="support-intro">Find answers, get to know your app, or reach out to us. A little help is always close by.</p></Reveal>
        <label className="support-search"><Search size={20} aria-hidden="true" /><span className="sr-only">Search apps and frequently asked questions</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search apps, subscriptions, reminders…" /></label>
        <div className="support-apps">{filteredApps.map(app => <Link key={app.slug} href={`/support/${app.slug}`} className="support-app-link"><Image src={app.iconPath || `/apps/${app.slug}-icon.jpg`} alt="" width={48} height={48} /><div>{app.name}<ArrowUpRight size={18} /></div><p>{app.supportIntro}</p></Link>)}</div>
        <section className="support-faq"><span className="eyebrow">Quick answers</span><h2 className="mt-3">{search ? "Search results" : "Common questions"}</h2><p className="sr-only" role="status" aria-live="polite">{search ? `${questions.length} answers found` : ""}</p><div className="faq-list">{(search ? questions : questions.filter(item => /account|cancel|restore|private|reminders are|download SpendPause/.test(item.question.toLowerCase()))).map((item, index) => <details key={`${item.app.slug}-${index}`}><summary><span><span className="eyebrow block mb-1">{item.app.name}</span>{item.question}</span><Plus size={18} /></summary><p>{Array.isArray(item.answer) ? item.answer.join(". ") : item.answer}</p></details>)}</div>{search && !questions.length && <p className="empty-search">No matching answers. Try an app name or contact us below.</p>}</section>
        <Reveal as="section" className="support-contact"><h2>Still need a hand?</h2><p>Send us your app name and a short description of what’s happening. We’ll help you take the next step.</p><a href="mailto:erosimcity@gmail.com" className="text-link">erosimcity@gmail.com <ArrowUpRight size={17} /></a></Reveal>
        <div className="legal-links mt-8"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/eula">EULA</Link><Link href="/data-deletion">Data deletion request</Link></div>
      </main>
      <Footer />
    </>
  )
}
