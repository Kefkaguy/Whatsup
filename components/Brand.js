import Image from "next/image"
import Link from "next/link"

export default function Brand({ priority = false }) {
  return <Link href="/" className="brand" aria-label="KefCore home">
    <span className="brand-logo-window"><Image src="/brand/kefcore-logo.png" alt="KefCore" width={2172} height={724} sizes="240px" priority={priority} /></span>
  </Link>
}
