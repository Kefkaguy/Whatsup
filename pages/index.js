import Head from "next/head"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  WifiOff,
  Zap,
} from "lucide-react"
import { apps, supportCategories } from "@/lib/apps"

const principles = [
  { label: "Privacy-first", icon: ShieldCheck },
  { label: "Local-first", icon: Lock },
  { label: "Clean design", icon: Sparkles },
  { label: "Fast experience", icon: Zap },
  { label: "Offline where possible", icon: WifiOff },
]

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

function PhonePreview({ app }) {
  return (
    <motion.div
      className="relative mx-auto aspect-[9/18] w-32 rounded-[2rem] border border-white/15 bg-[#050508] p-2 shadow-2xl shadow-black/40"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="h-full rounded-[1.45rem] border border-white/10 bg-zinc-950 p-3">
        <div className="mb-4 flex items-center justify-between">
          <span className="h-2 w-10 rounded-full bg-white/20" />
          <span className="h-5 w-5 rounded-md bg-[#3B82F6]" />
        </div>
        <div className="space-y-2">
          <div className="h-12 rounded-xl bg-[#3B82F6]/20 ring-1 ring-[#3B82F6]/30" />
          <div className="h-7 rounded-lg bg-white/10" />
          <div className="h-7 rounded-lg bg-white/10" />
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="h-12 rounded-lg bg-[#22D3EE]/15 ring-1 ring-[#22D3EE]/20" />
            <div className="h-12 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
      <div className="absolute -right-5 top-12 h-20 w-20 rounded-full bg-[#22D3EE]/10 blur-2xl" />
    </motion.div>
  )
}

function AppCard({ app }) {
  return (
    <motion.article
      variants={reveal}
      whileHover={{
        y: -5,
        borderColor: "rgba(59, 130, 246, 0.45)",
        boxShadow: "0 26px 90px rgba(0,0,0,0.34)",
      }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="grid gap-8 rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.24)] md:grid-cols-[1fr_auto] md:p-8"
    >
      <div>
        <div className="mb-5 flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#3B82F6]/15 text-sm font-bold text-[#93C5FD] ring-1 ring-[#3B82F6]/35">
            {app.icon}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white">{app.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">{app.summary}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {app.features.slice(0, 4).map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-zinc-200"
            >
              <span className="h-2 w-2 rounded-full bg-[#22D3EE]" />
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={app.storeUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#09090B] transition hover:bg-zinc-200"
          >
            App Store <ArrowRight size={16} />
          </a>
          <Link
            href={`/${app.slug}`}
            className="inline-flex items-center rounded-xl border border-white/12 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#3B82F6]/60"
          >
            Privacy
          </Link>
          <Link
            href={`/support/${app.slug}`}
            className="inline-flex items-center rounded-xl border border-white/12 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#22D3EE]/60"
          >
            Support
          </Link>
        </div>
      </div>
      <PhonePreview app={app} />
    </motion.article>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>KefCore | Privacy-first apps</title>
        <meta
          name="description"
          content="KefCore builds clean, privacy-first apps that work without accounts."
        />
      </Head>

      <main>
        <section className="relative overflow-hidden px-5 pb-24 pt-32 md:px-8 md:pb-28 md:pt-40">
          <div className="absolute inset-x-0 top-16 mx-auto h-64 max-w-3xl bg-[#22D3EE]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.h1
                variants={reveal}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl text-6xl font-semibold leading-[0.92] tracking-normal text-white md:text-8xl"
              >
                KefCore
              </motion.h1>
              <motion.p
                variants={reveal}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-2xl text-xl leading-8 text-zinc-300 md:text-2xl"
              >
                Building clean, privacy-first apps that work without accounts.
              </motion.p>
              <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#apps"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_34px_rgba(59,130,246,0.35)] transition hover:bg-[#2563EB]"
                >
                  View Apps <ArrowRight size={17} />
                </Link>
                <a
                  href="mailto:erosimcity@gmail.com"
                  className="rounded-xl border border-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30"
                >
                  Contact
                </a>
                <Link
                  href="/support"
                  className="rounded-xl border border-[#22D3EE]/30 px-5 py-3 text-sm font-semibold text-[#CFFAFE] transition hover:border-[#22D3EE]"
                >
                  Support
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-w-0"
            >
              <div className="absolute -inset-6 rounded-full bg-[#3B82F6]/10 blur-3xl" />
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="relative grid min-w-0 gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                {apps.map((app) => (
                  <motion.div
                    key={app.slug}
                    variants={reveal}
                    whileHover={{ x: 4, borderColor: "rgba(34, 211, 238, 0.36)" }}
                    className="flex min-w-0 items-center gap-4 rounded-xl border border-white/10 bg-[#09090B]/70 p-4"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#3B82F6]/15 text-xs font-bold text-[#93C5FD]">
                      {app.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white">{app.name}</div>
                      <div className="hidden truncate text-sm text-zinc-400 sm:block">
                        {app.features.slice(0, 3).join(" / ")}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          id="apps"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="px-5 py-20 md:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <motion.h2 variants={reveal} className="text-4xl font-semibold text-white md:text-5xl">
                Apps
              </motion.h2>
              <motion.p variants={reveal} className="mt-4 text-lg leading-7 text-zinc-400">
                Current apps are built for daily use, quick access, and private
                local storage. Future apps automatically appear here.
              </motion.p>
            </div>
            <div className="grid gap-6">
              {apps.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="border-y border-white/10 px-5 py-20 md:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-4xl font-semibold text-white md:text-5xl">
                About
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-300">
                We build simple apps focused on usability, speed, and privacy.
                No unnecessary accounts. No clutter.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {principles.map(({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={reveal}
                  whileHover={{ y: -3, borderColor: "rgba(34, 211, 238, 0.35)" }}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-5"
                >
                  <Icon className="text-[#22D3EE]" size={22} />
                  <span className="font-medium text-zinc-100">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="px-5 py-20 md:px-8"
        >
          <motion.div variants={reveal} className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#0D0D12] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-4xl font-semibold text-white">
                  Support Center
                </h2>
                <p className="mt-4 text-lg leading-7 text-zinc-400">
                  Find app help, billing guidance, legal pages, and contact
                  details.
                </p>
                <Link
                  href="/support"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white"
                >
                  Open Support <ArrowRight size={17} />
                </Link>
              </div>
              <div>
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-400">
                  <Search size={18} />
                  How can we help?
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {supportCategories.map((category) => (
                    <div
                      key={category}
                      className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-zinc-200"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <footer className="border-t border-white/10 px-5 py-10 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-white">KefCore</div>
              <div className="mt-1 text-sm text-zinc-500">
                Building privacy-first apps.
              </div>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-zinc-400">
              <Link href="/#apps">Apps</Link>
              <Link href="/support">Support</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/data-deletion">Data deletion request</Link>
              <a href="mailto:erosimcity@gmail.com">Contact</a>
            </div>
            <div className="text-sm text-zinc-500">&copy; 2026 KefCore</div>
          </div>
        </footer>
      </main>
    </>
  )
}
