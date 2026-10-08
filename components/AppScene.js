import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { apps } from "@/lib/apps"
import Reveal from "@/components/Reveal"

export default function AppScene() {
  const frame = useRef(null)
  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  function moveScene(event) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.hardwareConcurrency <= 4) return
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width * 14
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height * 14
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--drift-x", `${x}px`)
      element.style.setProperty("--drift-y", `${y}px`)
    })
  }

  function resetScene(event) {
    cancelAnimationFrame(frame.current)
    event.currentTarget.style.setProperty("--drift-x", "0px")
    event.currentTarget.style.setProperty("--drift-y", "0px")
  }

  return (
    <Reveal className="hero-art" delay={100} onPointerMove={moveScene} onPointerLeave={resetScene}>
      <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
      <span className="hero-art-caption eyebrow">A small collection.<br />A meaningful difference.</span>
      {apps.map((app, index) => <Link key={app.slug} href={`/${app.slug}`} className={`floating-app floating-app-${index}`} aria-label={`Explore ${app.name}`}><Image src={`/apps/${app.slug}-icon.jpg`} alt="" width={150} height={150} priority /><span>{app.name}<ArrowUpRight size={14} /></span></Link>)}
      <div className="art-stamp"><Sparkles size={19} /><span>Designed with intention.<br /><strong>Built for real life.</strong></span></div>
      <span className="art-spark art-spark-one" aria-hidden="true">✳</span><span className="art-spark art-spark-two" aria-hidden="true">+</span>
    </Reveal>
  )
}
