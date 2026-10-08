"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Code2, Database, Layers, ArrowRight } from "lucide-react"
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiTypescript } from "react-icons/si"
import { usePortfolioMotion } from "./PortfolioMotion"
import { portfolioMotion as tokens } from "@/lib/portfolio-motion"

const stages = [
  { label: "Interface", icon: Layers, file: "idea.tsx", tools: "React · Next.js · TypeScript", note: "An idea, with an interface.", code: 'export default function Idea() {\n  return (\n    <main>\n      <h1>Make something useful.</h1>\n    </main>\n  );\n}' },
  { label: "Server", icon: Code2, file: "route.ts", tools: "Node.js · Next.js", note: "A little logic behind the screen.", code: 'export async function GET() {\n  const ideas = await db\n    .collection("ideas")\n    .find({ status: "approved" })\n    .toArray();\n\n  return Response.json(ideas);\n}' },
  { label: "Data", icon: Database, file: "ideas.sql", tools: "MongoDB · SQL databases", note: "A place for the details to live.", code: "SELECT title, category\nFROM ideas\nWHERE status = 'approved'\nORDER BY created_at DESC;\n\n-- Small ideas, kept for later." },
]
export default function Workbench() {
  const [selected, setSelected] = useState(0)
  const enabled = usePortfolioMotion()
  const stage = stages[selected]
  return <div className="maker-workbench">
    <div className="workbench-label"><span className="eyebrow">A peek at my toolkit</span><span aria-hidden="true"><SiReact /><SiTypescript /><SiMongodb /></span></div>
    <div className="workbench-window">
      <div className="workbench-chrome"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>kefka / workbench</span><Code2 size={14} aria-hidden="true" /></div>
      <div className="workbench-tabs" role="group" aria-label="Explore my development stack">{stages.map(({ label, icon: Icon }, index) => <button type="button" key={label} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-controls="workbench-code"><Icon size={14} aria-hidden="true" />{label}</button>)}</div>
      <div className="workbench-file"><span>{stage.file}</span><span>Example</span></div>
      <div id="workbench-code" className="workbench-code" aria-live="polite" aria-atomic="true"><AnimatePresence mode="wait" initial={false}><motion.pre key={selected} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: enabled ? 0 : 1 }} transition={{ duration: enabled ? tokens.duration.fast : 0 }}><code>{stage.code.split("\n").map((line, index) => <span className="code-line" key={index}><span aria-hidden="true">{index + 1}</span>{line || " "}</span>)}</code></motion.pre></AnimatePresence></div>
      <div className="workbench-status"><span className="workbench-indicator" />{stage.tools}</div>
    </div>
    <div className="workbench-note"><SiNextdotjs aria-hidden="true" /><ArrowRight size={12} aria-hidden="true" /><SiNodedotjs aria-hidden="true" /><ArrowRight size={12} aria-hidden="true" /><Database size={17} aria-hidden="true" /><span>{stage.note}</span></div>
  </div>
}
