import Head from "next/head"
import { ArrowUpRight, Code2, Layout, Search } from "lucide-react"
import Reveal from "@/components/Reveal"
import Footer from "@/components/Footer"

const services = [
  { icon: Layout, title: "Website design", text: "Clear, thoughtful interfaces that bring your brand to life." },
  { icon: Code2, title: "Development", text: "Responsive websites built around your business and your audience." },
  { icon: Search, title: "SEO + CMS", text: "A solid foundation for discovery, with content you can manage." },
]

export default function Services() {
  return <><Head><title>Design & Development | KefCore</title><meta name="description" content="Website design, development, SEO and CMS services from KefCore." /></Head><main className="support-page shell"><Reveal><span className="eyebrow">Design & development</span><h1>Your next idea.<br /><em>Thoughtfully built.</em></h1><p className="support-intro">We bring the same care behind our apps to websites. Let’s make something useful, clear, and distinctly yours.</p><a href="https://www.fiverr.com/s/DB774dV" target="_blank" rel="noopener noreferrer" className="button-primary mt-7">Work with us <ArrowUpRight size={18} /></a></Reveal><div className="product-feature-grid mt-16">{services.map(({icon: Icon, title, text}) => <Reveal key={title} className="product-feature"><Icon size={22} /><div><h2 className="text-xl">{title}</h2><p className="support-intro text-sm">{text}</p></div></Reveal>)}</div></main><Footer /></>
}
