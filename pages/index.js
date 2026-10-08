import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { ArrowDown, ArrowRight, ArrowUpRight, Check, LockKeyhole, Sparkles, WifiOff } from "lucide-react"
import { apps } from "@/lib/apps"
import Reveal from "@/components/Reveal"
import AppStoreLink from "@/components/AppStoreLink"
import Footer from "@/components/Footer"
import AppScene from "@/components/AppScene"

const principles = [
  { icon: LockKeyhole, title: "Your life stays yours.", text: "Personal information belongs on your device. Privacy is part of the foundation." },
  { icon: Sparkles, title: "Only what you need.", text: "Clear interfaces and thoughtful details. Less friction between you and your day." },
  { icon: WifiOff, title: "Ready when you are.", text: "No account to create. Core features work offline, so you can get straight to it." },
]

function AppProject({ app, index }) {
  return (
    <Reveal as="article" className={`app-project theme-${app.theme}`}>
      <div className="project-art">
        <span className="art-label">{app.category}</span>
        <Link href={`/${app.slug}`} className="project-poster" aria-label={`Explore ${app.name}`}>
          <Image src={`/apps/${app.slug}-1.jpg`} alt={`${app.name} App Store preview showing its features and interface`} width={416} height={900} sizes="(max-width: 700px) 230px, 280px" />
        </Link>
        <span className="art-footnote">Made for your everyday.</span>
      </div>
      <div className="project-copy">
        <div className="project-meta"><span className="eyebrow">0{index + 1} / {app.category}</span><ArrowUpRight size={21} aria-hidden="true" /></div>
        <div className="app-name"><Image src={`/apps/${app.slug}-icon.jpg`} alt="" width={52} height={52} /><h3>{app.name}</h3></div>
        <h4>{app.headline}</h4>
        <p>{app.shortDescription}</p>
        <ul className="feature-list">{app.features.slice(0, 4).map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
        <div className="project-actions"><AppStoreLink app={app} /><Link href={`/${app.slug}`} className="text-link">Explore app <ArrowRight size={17} /></Link></div>
        <div className="project-utility"><Link href={`/support/${app.slug}`}>App support</Link><span aria-hidden="true">/</span><Link href={app.privacyPath || "/privacy"}>Privacy policy</Link></div>
      </div>
    </Reveal>
  )
}

export default function Home() {
  return (
    <>
      <Head><title>KefCore | Thoughtful apps for everyday life</title><meta name="description" content="Meet BoxSpot, LiftCore, and PetCare+. Thoughtful, privacy-first iPhone apps for a more organized, balanced everyday." /></Head>
      <main>
        <section className="hero shell">
          <Reveal className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> Independent apps. Thoughtfully made.</span>
            <h1>A little less clutter.<br />A lot more <em>life.</em></h1>
            <p>Organize your space. Find your strength. Care for your companions. Simple apps that make room for what matters.</p>
            <div className="hero-actions"><Link href="#apps" className="button-primary">Discover the apps <ArrowDown size={18} /></Link><Link href="#about" className="text-link">Meet KefCore <ArrowUpRight size={17} /></Link></div>
            <div className="hero-note"><LockKeyhole size={14} /><span>Your data, your device. No account needed.</span></div>
          </Reveal>
          <AppScene />
        </section>
        <div className="trust-strip"><div className="shell"><span>Small apps. Considered details.</span><span><LockKeyhole size={16} />Privacy first</span><span><WifiOff size={16} />Offline ready</span><span><Sparkles size={16} />Built with care</span></div></div>
        <section id="apps" className="apps-section shell">
          <Reveal className="section-heading"><div><span className="eyebrow">The collection / 01—03</span><h2>Good things.<br /><em>Small packages.</em></h2></div><p>Three different corners of your life.<br />The same thoughtful approach.</p></Reveal>
          <div className="projects">{apps.map((app, index) => <AppProject key={app.slug} app={app} index={index} />)}</div>
        </section>
        <section id="about" className="about-section">
          <div className="shell"><Reveal className="about-heading"><span className="eyebrow">The thinking behind KefCore</span><h2>Technology should<br />give you <em>room to breathe.</em></h2><p>We’re an independent app studio making everyday tools with a simple belief: useful can be beautiful, and simple can be powerful.</p></Reveal>
            <div className="principles">{principles.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 80}><Icon size={25} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
          </div>
        </section>
        <Reveal as="section" className="ideas-invitation shell"><div><span className="eyebrow">Help shape what comes next</span><h2>Got a little <em>“what if?”</em></h2><p>Tell us about an offline app you wish existed. A small everyday problem could be the start of something useful.</p></div><Link href="/ideas" className="button-primary">Share your app idea <ArrowUpRight size={18} /></Link></Reveal>
        <Reveal as="section" className="support-banner shell"><div><span className="eyebrow">A human on the other end</span><h2>A little help goes a long way.</h2><p>Questions, ideas, or something that’s not quite right? We’re here.</p></div><Link href="/support" className="button-primary">Visit support <ArrowUpRight size={18} /></Link></Reveal>
      </main>
      <Footer />
    </>
  )
}
