import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <Link href="/" className="brand"><span className="brand-mark">k.</span>KefCore</Link>
        <p>Thoughtful apps. A simpler everyday.</p>
        <a href="mailto:erosimcity@gmail.com" className="text-link">Say hello <ArrowUpRight size={17} /></a>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 KefCore</span>
        <div><Link href="/#apps">Apps</Link><Link href="/support">Support</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/eula">EULA</Link><Link href="/data-deletion">Data deletion</Link></div>
        <span>Made with care.</span>
      </div>
    </footer>
  )
}
