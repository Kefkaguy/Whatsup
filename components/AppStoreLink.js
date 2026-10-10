import { ArrowUpRight } from "lucide-react"
import { FaApple, FaWindows } from "react-icons/fa"

export default function AppStoreLink({ app, className = "" }) {
  if (app.downloadUrl) return <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer" className={`store-button windows-download ${className}`}><FaWindows size={24} aria-hidden="true" /><span><small>Download for</small>{" "}<strong>{app.platform}</strong></span><span className="sr-only">: {app.name}, GitHub release (opens in a new tab)</span><ArrowUpRight size={18} aria-hidden="true" /></a>
  if (!app.storeUrl) return <span className={`store-button is-coming-soon ${className}`}><FaApple size={25} aria-hidden="true" /><span><small>Coming soon to</small>{" "}<strong>iPhone</strong></span><span className="sr-only">: {app.name}</span></span>
  return (
    <a href={app.storeUrl} target="_blank" rel="noopener noreferrer" className={`store-button ${className}`}>
      <FaApple size={25} aria-hidden="true" />
      <span><small>Download on the</small>{" "}<strong>App Store</strong></span>
      <span className="sr-only"> for {app.name} (opens in a new tab)</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  )
}
