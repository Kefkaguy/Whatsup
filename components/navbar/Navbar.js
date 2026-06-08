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
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#C2A072]/30 bg-[#F0ECE3]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#506754]/35 bg-[#BBC8A6] text-sm font-bold text-[#1B1814] shadow-[0_12px_34px_rgba(80,103,84,0.18)]">
            K
          </span>
          <span className="text-base font-semibold tracking-wide text-[#1B1814]">
            KefCore
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#4E493E] transition hover:text-[#1B1814]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="mailto:erosimcity@gmail.com"
            className="rounded-xl bg-[#506754] px-4 py-2 text-sm font-semibold text-[#F8F4E9] shadow-[0_14px_32px_rgba(80,103,84,0.22)] transition hover:bg-[#5B7875]"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-[#C2A072]/40 text-[#1B1814] md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#C2A072]/30 bg-[#F8F4E9] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-[#4E493E]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="mailto:erosimcity@gmail.com"
              onClick={() => setIsOpen(false)}
              className="w-fit rounded-xl bg-[#506754] px-4 py-2 text-sm font-semibold text-[#F8F4E9]"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
