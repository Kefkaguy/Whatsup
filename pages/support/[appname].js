import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react"
import { apps, getAppBySlug } from "@/lib/apps"
import Reveal from "@/components/Reveal"
import AppStoreLink from "@/components/AppStoreLink"
import Footer from "@/components/Footer"

function Answer({ item }) {
  if (!Array.isArray(item.answer)) return <p>{item.answer}</p>
  const List = item.ordered ? "ol" : "ul"
  return <List className={item.ordered ? "list-decimal pl-5" : "list-disc pl-5"}>{item.answer.map(line => <li key={line}>{line}</li>)}</List>
}

export default function AppSupportPage({ app }) {
  return (
    <>
      <Head><title>{app.name} Support | KefCore</title><meta name="description" content={`${app.name} support and frequently asked questions.`} /></Head>
      <main className="support-page shell">
        <Link href="/support" className="breadcrumb"><ArrowLeft size={15} />Support center</Link>
        <Reveal><span className="eyebrow">Made with care. Supported with care.</span><h1>{app.name} support</h1><p className="support-intro">{app.supportSubtitle || app.supportIntro}</p><div className="support-top-actions"><AppStoreLink app={app} /><Link href={`/${app.slug}`} className="text-link">Explore {app.name}<ArrowUpRight size={17} /></Link></div></Reveal>
        <Reveal as="section" className="support-faq mt-14"><h2>Frequently asked questions.</h2><div className="faq-list">{app.faq.map(item => <details key={item.question}><summary>{item.question}<Plus size={18} /></summary><Answer item={item} /></details>)}</div></Reveal>
        <Reveal as="section" className="support-contact"><h2>We’re here to help.</h2><p>Have a question or an idea for {app.name}? We’d love to hear from you.</p><a href={`mailto:${app.supportEmail}?subject=${encodeURIComponent(app.name + " support")}`} className="text-link">{app.supportEmail}<ArrowUpRight size={17} /></a><dl className="contact-grid"><div><dt>App</dt><dd>{app.appName}</dd></div><div><dt>Response time</dt><dd>{app.responseTime || "Usually within 24–48 hours"}</dd></div></dl></Reveal>
        <div className="legal-links mt-8">{(app.legalLinks || [{ label: "Privacy policy", href: app.privacyPath || "/privacy" }, { label: "Terms", href: "/terms" }, { label: "EULA", href: "/eula" }]).map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
      </main>
      <Footer />
    </>
  )
}

export function getStaticPaths() {
  return { paths: apps.map(app => ({ params: { appname: app.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  return { props: { app: getAppBySlug(params.appname) } }
}
