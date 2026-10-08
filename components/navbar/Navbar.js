import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ArrowUpRight, Menu, X } from "lucide-react"

const links = [{ label: "The apps", href: "/#apps" }, { label: "Our approach", href: "/#about" }, { label: "App ideas", href: "/ideas" }, { label: "Portfolio", href: "/portfolio" }, { label: "Support", href: "/support" }]

export default function AdvancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const menuButton = useRef(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => { setIsOpen(false) }, [router.asPath])
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = event => { if (event.key === "Escape") { setIsOpen(false); menuButton.current?.focus() } }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="shell navbar" aria-label="Main navigation">
        <Link href="/" className="brand"><span className="brand-mark">k.</span>KefCore</Link>
        <div className="desktop-nav">{links.map(link => <Link key={link.href} href={link.href} className="nav-link" aria-current={router.asPath === link.href ? "page" : undefined}>{link.label}</Link>)}<a href="mailto:erosimcity@gmail.com" className="nav-contact">Let’s talk <ArrowUpRight size={15} /></a></div>
        <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close menu" : "Open menu"} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </nav>
      {isOpen && <div id="mobile-navigation" className="mobile-nav shell">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}<ArrowUpRight size={17} /></Link>)}<a href="mailto:erosimcity@gmail.com" onClick={() => setIsOpen(false)}>Let’s talk <ArrowUpRight size={17} /></a></div>}
    </header>
  )
}
