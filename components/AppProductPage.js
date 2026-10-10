import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Check, Plus } from "lucide-react"
import Reveal from "@/components/Reveal"
import AppStoreLink from "@/components/AppStoreLink"
import SpendPauseArt from "@/components/SpendPauseArt"
import KefCullArt from "@/components/KefCullArt"
import Footer from "@/components/Footer"

export default function AppProductPage({ app }) {
  const screenshots = app.screenshots ?? [1, 2, 3]
  const comingSoon = app.status === "coming-soon"
  return (
    <>
      <Head><title>{app.name} | KefCore</title><meta name="description" content={app.shortDescription} /></Head>
      <main className={`product-page shell theme-${app.theme}`}>
        <Link href="/#apps" className="breadcrumb"><ArrowLeft size={15} />Back to the collection</Link>
        <section className="product-hero">
          <Reveal>
            <div className="app-name"><Image src={app.iconPath || `/apps/${app.slug}-icon.jpg`} width={58} height={58} alt="" /><h2>{app.name}</h2></div>
            <span className="eyebrow">{app.category} / Made for {app.platform || "iPhone"}</span>
            <h1>{app.headline}</h1>
            <p className="product-description">{app.shortDescription}</p>
            <div className="project-actions"><AppStoreLink app={app} /><Link href={`/support/${app.slug}`} className="text-link">Get support <ArrowUpRight size={17} /></Link></div>
            {(app.productNote || !comingSoon) && <div className="hero-note">{app.productNote || "No account needed. Your data stays on your device."}</div>}
          </Reveal>
          <Reveal className="project-art product-visual" delay={100}><span className="art-label">{app.name} / A closer look</span>{app.artworkType === "kefcull" ? <KefCullArt /> : app.artworkType === "icon" ? <SpendPauseArt /> : <div className="project-poster"><Image src={`/apps/${app.slug}-1.jpg`} alt={`${app.name} App Store artwork showing its interface and features`} width={416} height={900} priority sizes="230px" /></div>}<span className="art-footnote">Thoughtfully made for everyday life.</span></Reveal>
        </section>
        <Reveal as="section" className="product-features"><span className="eyebrow">Simple tools. Real possibilities.</span><h2>Everything you need to get going.</h2><div className="product-feature-grid">{app.features.map(feature => <div className="product-feature" key={feature}><Check size={19} /><h3>{feature}</h3></div>)}</div></Reveal>
        {app.productSections?.length > 0 && <div className="product-story-grid">{app.productSections.map(section => <Reveal as="section" id={section.id} className="product-story" key={section.id}><span className="eyebrow">{section.eyebrow}</span><h2>{section.title}</h2><p>{section.text}</p><ul className="feature-list">{section.points.map(point => <li key={point}><Check size={15} aria-hidden="true" />{point}</li>)}</ul></Reveal>)}</div>}
        {screenshots.length > 0 && <Reveal as="section" className="screenshot-section"><span className="eyebrow">Inside {app.name}</span><h2>A closer look at the details.</h2><div className="screenshot-grid">{screenshots.map(number => <Image key={number} src={`/apps/${app.slug}-${number}.jpg`} alt={`${app.name} App Store preview ${number}`} width={416} height={900} sizes="(max-width: 760px) 210px, 33vw" />)}</div></Reveal>}
        <section className="product-details">
          {app.proFeatures?.length > 0 ? <Reveal><span className="eyebrow">Go a little further</span><h2>{app.name} Pro</h2><p>Expanded tools for more insight and customization. Explore the available in-app upgrades in {app.name}.</p><ul className="feature-list">{app.proFeatures.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul></Reveal> : <Reveal><span className="eyebrow">{app.detailEyebrow || "On your terms"}</span><h2>{app.detailHeading || "Your wishlist, with room to think."}</h2>{(app.detailHeading ? app.descriptionParagraphs : app.descriptionParagraphs?.slice(1))?.map(text => <p key={text}>{text}</p>)}</Reveal>}
          <Reveal><span className="eyebrow">Good to know</span><h2>A few common questions.</h2><div className="faq-list">{app.faq.slice(0,4).map(item => <details key={item.question}><summary>{item.question}<Plus size={17} /></summary><p>{Array.isArray(item.answer) ? item.answer.join(", ") : item.answer}</p></details>)}</div><Link href={`/support/${app.slug}`} className="text-link">More help with {app.name}<ArrowUpRight size={16} /></Link></Reveal>
        </section>
        <Reveal as="section" className="product-download"><div><h2>{app.downloadHeading || `Make a little room for ${app.name}.`}</h2><p>{app.downloadDescription || (comingSoon ? "Share it now. Decide later. Coming soon to iPhone." : "Find your next everyday companion on the App Store.")}</p></div><AppStoreLink app={app} /></Reveal>
        <div className="legal-links">{(app.legalLinks || [{ label: "Privacy policy", href: app.privacyPath || "/privacy" }, { label: "Terms", href: "/terms" }, { label: "EULA", href: "/eula" }]).map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}<Link href={`/support/${app.slug}`}>App support</Link></div>
      </main>
      <Footer />
    </>
  )
}
