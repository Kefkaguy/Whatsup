import Image from "next/image"
import { FolderOpen, ArrowLeftRight, Download, ShieldCheck } from "lucide-react"

export default function KefCullArt() {
  return <div className="cull-art">
    <span className="cull-platform">Windows x64 <span aria-hidden="true">/</span> v0.5.2</span>
    <div className="cull-mark"><Image src="/apps/kefcull-icon.png" alt="KefCull geometric green aperture icon" width={256} height={256} sizes="(max-width: 700px) 160px, 200px" /></div>
    <h3>A clearer collection.<br /><em>Entirely yours.</em></h3>
    <div className="cull-workflow">{[[FolderOpen, "Organize"], [ArrowLeftRight, "Review"], [Download, "Export"]].map(([Icon, label]) => <span key={label}><Icon size={20} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></span>)}</div>
    <p><ShieldCheck size={14} aria-hidden="true" />Local AI. Original files preserved.</p>
  </div>
}
