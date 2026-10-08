import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Check, Plus } from "lucide-react"
import Reveal from "@/components/Reveal"
import AppStoreLink from "@/components/AppStoreLink"
import Footer from "@/components/Footer"

export default function AppProductPage({ app }) {
  return (
    <>
      <Head><title>{app.name} | KefCore</title><meta name="description" content={app.shortDescription} /></Head>
      <main className={`product-page shell theme-${app.theme}`}>
        <Link href="/#apps" className="breadcrumb"><ArrowLeft size={15} />Back to the collection</Link>
        <section className="product-hero">
          <Reveal>
            <div className="app-name"><Image src={`/apps/${app.slug}-icon.jpg`} width={58} height={58} alt="" /><h2>{app.name}</h2></div>
            <span className="eyebrow">{app.category} / Made for iPhone</span>
            <h1>{app.headline}</h1>
            <p className="product-description">{app.shortDescription}</p>
            <div className="project-actions"><AppStoreLink app={app} /><Link href={`/support/${app.slug}`} className="text-link">Get support <ArrowUpRight size={17} /></Link></div>
            <div className="hero-note">No account needed. Your data stays on your device.</div>
          </Reveal>
          <Reveal className="project-art product-visual" delay={100}><span className="art-label">{app.name} / A closer look</span><div className="project-poster"><Image src={`/apps/${app.slug}-1.jpg`} alt={`${app.name} App Store artwork showing its interface and features`} width={416} height={900} priority sizes="230px" /></div><span className="art-footnote">Thoughtfully made for everyday life.</span></Reveal>
        </section>
        <Reveal as="section" className="product-features"><span className="eyebrow">Simple tools. Real possibilities.</span><h2>Everything you need to get going.</h2><div className="product-feature-grid">{app.features.map(feature => <div className="product-feature" key={feature}><Check size={19} /><h3>{feature}</h3></div>)}</div></Reveal>
        <Reveal as="section" className="screenshot-section"><span className="eyebrow">Inside {app.name}</span><h2>A closer look at the details.</h2><div className="screenshot-grid">{[1,2,3].map(number => <Image key={number} src={`/apps/${app.slug}-${number}.jpg`} alt={`${app.name} App Store preview ${number}`} width={416} height={900} sizes="(max-width: 760px) 210px, 33vw" />)}</div></Reveal>
        <section className="product-details">
          <Reveal><span className="eyebrow">Go a little further</span><h2>{app.name} Pro</h2><p>Expanded tools for more insight and customization. Explore the available in-app upgrades in {app.name}.</p><ul className="feature-list">{app.proFeatures.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul></Reveal>
          <Reveal><span className="eyebrow">Good to know</span><h2>A few common questions.</h2><div className="faq-list">{app.faq.slice(0,4).map(item => <details key={item.question}><summary>{item.question}<Plus size={17} /></summary><p>{Array.isArray(item.answer) ? item.answer.join(", ") : item.answer}</p></details>)}</div><Link href={`/support/${app.slug}`} className="text-link">More help with {app.name}<ArrowUpRight size={16} /></Link></Reveal>
        </section>
        <Reveal as="section" className="product-download"><div><h2>Make a little room for {app.name}.</h2><p>Find your next everyday companion on the App Store.</p></div><AppStoreLink app={app} /></Reveal>
        <div className="legal-links"><Link href={app.privacyPath || "/privacy"}>Privacy policy</Link><Link href="/terms">Terms</Link><Link href="/eula">EULA</Link><Link href={`/support/${app.slug}`}>App support</Link></div>
      </main>
      <Footer />
    </>
  )
}
