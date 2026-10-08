import Image from "next/image"
import { Bookmark, Clock3, Check } from "lucide-react"

export default function SpendPauseArt() {
  return <div className="pause-art">
    <span className="pause-label">Coming soon to iPhone</span>
    <Image src="/apps/spendpause-icon.png" alt="SpendPause mascot with a shopping bag and a blue clock" width={800} height={800} sizes="(max-width: 700px) 260px, 320px" className="pause-mascot" />
    <h3>Share it now.<br /><em>Decide later.</em></h3>
    <div className="pause-steps">{[[Bookmark, "Save"], [Clock3, "Pause"], [Check, "Decide"]].map(([Icon, label]) => <span key={label}><Icon size={16} aria-hidden="true" />{label}</span>)}</div>
  </div>
}
