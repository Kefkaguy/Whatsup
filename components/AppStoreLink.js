import { ArrowUpRight } from "lucide-react"
import { FaApple } from "react-icons/fa"

export default function AppStoreLink({ app, className = "" }) {
  return (
    <a href={app.storeUrl} target="_blank" rel="noopener noreferrer" className={`store-button ${className}`}>
      <FaApple size={25} aria-hidden="true" />
      <span><small>Download on the</small>{" "}<strong>App Store</strong></span>
      <span className="sr-only"> for {app.name} (opens in a new tab)</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  )
}
