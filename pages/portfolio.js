import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { ArrowDown, ArrowUpRight, ArrowRight, Lightbulb, Mail, WifiOff } from "lucide-react"
import { apps } from "@/lib/apps"
import { mainStack, exploringStack, technologyIcons } from "@/lib/portfolio"
import { PortfolioReveal, TechnologyChip } from "@/components/portfolio/PortfolioMotion"
import Workbench from "@/components/portfolio/Workbench"
import WebsiteGallery from "@/components/portfolio/WebsiteGallery"
import Footer from "@/components/Footer"

function SkillGroup({ group, exploring = false }) {
  const Icon = group.icon
  return <PortfolioReveal as="article" className={"maker-skill-group " + (exploring ? "is-exploring" : "accent-" + group.tone)}><div className="maker-skill-heading"><span className="maker-category-icon"><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></span><h3>{group.title}</h3></div><div className="maker-technologies">{group.tools.map(name => <TechnologyChip key={name} name={name} icon={technologyIcons[name]} />)}</div></PortfolioReveal>
}

export default function PortfolioPage() {
  return <>
    <Head><title>Kefka | Full-stack web developer</title><meta name="description" content="Kefka’s personal portfolio: a full-stack web development toolkit, six personal website experiments, and independent apps." /></Head>
    <main className="maker-page shell">
      <section className="maker-hero">
        <PortfolioReveal className="maker-intro"><span className="eyebrow">The person behind KefCore / Kefka</span><div className="maker-role"><span />Full-stack web developer</div><h1>Small idea.<br />Real code.<br /><em>Something useful.</em></h1><p>My main focus is full-stack web development. I work with JavaScript, TypeScript, React, Next.js, and the tools that connect an interface to its data.</p><p>I also build websites for fun—to try a new look, explore an interaction, or see where an idea goes.</p><div className="maker-hero-actions"><a href="#websites" className="button-primary">Explore my work <ArrowDown size={17} /></a><a href="mailto:erosimcity@gmail.com" className="text-link">Say hello <ArrowUpRight size={16} /></a></div></PortfolioReveal>
        <PortfolioReveal><Workbench /></PortfolioReveal>
      </section>
      <nav className="maker-section-nav" aria-label="Portfolio sections"><span className="eyebrow">Take a look around</span><a href="#toolkit">01 <span>Main toolkit</span><ArrowDown size={13} /></a><a href="#exploring">02 <span>Learning & exploring</span><ArrowDown size={13} /></a><a href="#websites">03 <span>Website experiments</span><ArrowDown size={13} /></a><a href="#made-apps">04 <span>The apps</span><ArrowDown size={13} /></a></nav>

      <section id="toolkit" className="maker-section">
        <PortfolioReveal className="section-heading"><div><span className="eyebrow">01 / My main toolkit</span><h2>The tools I<br /><em>build with.</em></h2></div><p>My focus is the web, from the interface<br />to the database and the server.</p></PortfolioReveal>
        <div className="maker-skills-grid">{mainStack.map(group => <SkillGroup key={group.title} group={group} />)}</div>
      </section>
      <section id="exploring" className="maker-section maker-exploring">
        <PortfolioReveal className="maker-exploring-heading"><div><span className="eyebrow">02 / Learning & exploring</span><h2>Curiosity has<br /><em>a few side quests.</em></h2></div><div><span className="maker-learning-label"><Lightbulb size={14} aria-hidden="true" />Foundational familiarity</span><p>I have basic or introductory familiarity with these languages and tools. My depth varies, and I’m still learning—especially with languages such as C++.</p></div></PortfolioReveal>
        <div className="maker-exploring-grid">{exploringStack.map(group => <SkillGroup key={group.title} group={group} exploring />)}</div>
      </section>

      <section id="websites" className="maker-section">
        <PortfolioReveal className="section-heading"><div><span className="eyebrow">03 / Six websites. Just for fun.</span><h2>A little playground.<br /><em>A lot of possibilities.</em></h2></div><p>Personal projects and design experiments.<br />Different ideas, each with its own character.</p></PortfolioReveal>
        <WebsiteGallery />
      </section>

      <section id="made-apps" className="maker-section maker-apps-section">
        <PortfolioReveal className="section-heading"><div><span className="eyebrow">04 / Independent apps</span><h2>Useful beyond<br /><em>the browser.</em></h2></div><Link href="/#apps" className="text-link">Meet the KefCore collection <ArrowUpRight size={16} /></Link></PortfolioReveal>
        <div className="maker-app-grid">{apps.map(app => <PortfolioReveal key={app.slug} as="article" className="maker-app-project"><Image src={app.iconPath || "/apps/" + app.slug + "-icon.jpg"} width={58} height={58} alt="" /><span className="eyebrow">{app.category}</span><h3>{app.name}</h3>{app.status === "coming-soon" && <span className="pause-label portfolio-coming-soon">Coming soon</span>}<p>{app.shortDescription}</p><Link href={"/" + app.slug} className="text-link">Explore app <ArrowUpRight size={16} /></Link></PortfolioReveal>)}</div>
      </section>
      <PortfolioReveal as="section" className="maker-contact"><div><span className="eyebrow">An idea worth talking about?</span><h2>Let’s make<br /><em>something useful.</em></h2><p>A website, an app idea, or a simple hello. My inbox is open.</p></div><a href="mailto:erosimcity@gmail.com" className="maker-contact-link"><Mail size={21} strokeWidth={1.5} aria-hidden="true" /><span>erosimcity@gmail.com</span><ArrowUpRight size={23} aria-hidden="true" /></a><div className="maker-contact-note"><WifiOff size={15} aria-hidden="true" />Have an offline app idea? <Link href="/ideas">Add it to the notebook <ArrowRight size={14} /></Link></div></PortfolioReveal>
    </main>
    <Footer />
  </>
}
