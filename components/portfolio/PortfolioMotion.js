"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls, useInView, useReducedMotion } from "motion/react"
import { portfolioMotion as tokens } from "@/lib/portfolio-motion"

export function usePortfolioMotion() {
  const reduced = useReducedMotion()
  const [capable, setCapable] = useState(false)
  useEffect(() => { setCapable(!navigator.hardwareConcurrency || navigator.hardwareConcurrency > 4) }, [])
  return capable && !reduced
}

export function PortfolioReveal({ children, className, as = "div", ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const enabled = usePortfolioMotion()
  const controls = useAnimationControls()
  const started = useRef(false)
  const Tag = as === "article" ? motion.article : as === "section" ? motion.section : motion.div
  useEffect(() => {
    if (!enabled) { controls.stop(); controls.set({ opacity: 1, y: 0 }); return }
    if (inView && !started.current) {
      started.current = true
      controls.start({ opacity: [0, 1], y: [tokens.distance.reveal, 0],
        transition: { duration: tokens.duration.slow, ease: tokens.easing } })
    }
  }, [inView, enabled, controls])
  return <Tag ref={ref} className={className} initial={{ opacity: 1, y: 0 }} animate={controls} {...props}>{children}</Tag>
}

export function TechnologyChip({ name, icon: Icon }) {
  const enabled = usePortfolioMotion()
  return <motion.span className="maker-tech" whileHover={enabled ? { y: tokens.distance.chip } : undefined} transition={{ duration: tokens.duration.fast, ease: tokens.easing }}><Icon aria-hidden="true" /><span>{name}</span></motion.span>
}
