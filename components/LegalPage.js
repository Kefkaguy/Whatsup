import Head from "next/head"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Reveal from "@/components/Reveal"
import Footer from "@/components/Footer"

export default function LegalPage({ title, children }) {
  return (
    <>
      <Head><title>{title} | KefCore</title></Head>
      <main className="legal-page shell">
        <Link href="/support" className="breadcrumb"><ArrowLeft size={15} />Support center</Link>
        <Reveal><h1>{title}</h1><div className="legal-content">{children}</div></Reveal>
      </main>
      <Footer />
    </>
  )
}
