import React, { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Apps", href: "/#apps" },
  { label: "Support", href: "/support" },
  { label: "About", href: "/#about" },
]

export default function AdvancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#3B82F6]/50 bg-[#3B82F6]/15 text-sm font-bold text-[#93C5FD] shadow-[0_0_28px_rgba(34,211,238,0.22)]">
            K
          </span>
          <span className="text-base font-semibold tracking-wide text-white">
            KefCore
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="mailto:erosimcity@gmail.com"
            className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_26px_rgba(59,130,246,0.3)] transition hover:bg-[#2563EB]"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#09090B] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-zinc-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="mailto:erosimcity@gmail.com"
              onClick={() => setIsOpen(false)}
              className="w-fit rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
