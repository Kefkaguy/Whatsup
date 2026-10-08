"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowUpRight, Globe } from "lucide-react"
import { webProjects, projectFilters } from "@/lib/portfolio"
import { usePortfolioMotion } from "./PortfolioMotion"
import { portfolioMotion as tokens } from "@/lib/portfolio-motion"

export default function WebsiteGallery() {
  const [filter, setFilter] = useState("All websites")
  const enabled = usePortfolioMotion()
  const visible = filter === "All websites" ? webProjects : webProjects.filter(project => project.category === filter)
  return <>
    <div className="maker-gallery-toolbar"><div className="maker-filters" role="group" aria-label="Filter website projects">{projectFilters.map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<span>{category === "All websites" ? webProjects.length : webProjects.filter(project => project.category === category).length}</span></button>)}</div><p role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "website" : "websites"}</p></div>
    <div className="maker-web-grid">{visible.map(project => <motion.article className={"maker-web-project accent-" + project.tone} key={project.id} initial={{ opacity: 1, y: 0 }} whileHover={enabled ? { y: tokens.distance.hover } : undefined} transition={{ duration: tokens.duration.normal, ease: tokens.easing }}><a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={"Visit " + project.title + " (opens in a new tab)"} className="maker-project-link">
      <div className="maker-browser-bar" aria-hidden="true"><span className="mini-dots"><i /><i /><i /></span><span>{new URL(project.url).hostname}</span><ArrowUpRight size={12} /></div>
      <div className="maker-web-image"><motion.div className="maker-web-preview" initial={{ scale: 1 }} whileHover={enabled ? { scale: tokens.scale.image } : undefined} transition={{ duration: tokens.duration.normal, ease: tokens.easing }}><Image src={"/portfolio/" + project.id + ".jpg"} alt={project.title + " website homepage"} width={1440} height={960} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1050px) 45vw, 570px" /></motion.div><span className="maker-open-site"><Globe size={14} />Visit website <ArrowUpRight size={14} /></span></div>
      <div className="maker-project-copy"><div className="maker-project-meta"><span className="eyebrow">{project.kind}</span><ArrowUpRight size={20} aria-hidden="true" /></div><h3>{project.title}</h3><p>{project.description}</p></div>
    </a></motion.article>)}</div>
  </>
}
