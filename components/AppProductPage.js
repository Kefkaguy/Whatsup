import Head from "next/head"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Bell, Check, ShieldCheck } from "lucide-react"

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

function FeaturePhone({ app }) {
  return (
    <motion.div
      className="relative mx-auto aspect-[9/18] w-full max-w-[280px] rounded-[2.45rem] border border-white/15 bg-black p-3 shadow-2xl shadow-black/50"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="h-full rounded-[1.85rem] border border-white/10 bg-[#09090B] p-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500">{app.name}</div>
            <div className="text-lg font-semibold text-white">Today</div>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#3B82F6] text-xs font-bold text-white">
            {app.icon}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl bg-[#3B82F6]/15 p-4 ring-1 ring-[#3B82F6]/25">
            <BarChart3 className="mb-5 text-[#93C5FD]" size={22} />
            <div className="h-2 w-20 rounded-full bg-white/30" />
            <div className="mt-3 h-2 w-32 rounded-full bg-white/15" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 rounded-2xl bg-white/[0.06] ring-1 ring-white/10" />
            <div className="h-20 rounded-2xl bg-[#22D3EE]/10 ring-1 ring-[#22D3EE]/20" />
          </div>
          <div className="h-24 rounded-2xl bg-white/[0.06] ring-1 ring-white/10" />
        </div>
      </div>
      <div className="absolute -left-8 bottom-20 h-24 w-24 rounded-full bg-[#3B82F6]/20 blur-3xl" />
    </motion.div>
  )
}

export default function AppProductPage({ app }) {
  return (
    <>
      <Head>
        <title>{app.name} | KefCore</title>
        <meta name="description" content={app.summary} />
      </Head>

      <main className="px-5 pb-20 pt-32 md:px-8">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.8fr]"
        >
          <motion.div variants={reveal}>
            <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl">
              {app.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300">
              {app.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={app.storeUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white"
              >
                App Store <ArrowRight size={17} />
              </a>
              <Link
                href={`/support/${app.slug}`}
                className="rounded-xl border border-[#22D3EE]/30 px-5 py-3 text-sm font-semibold text-[#CFFAFE]"
              >
                Support
              </Link>
            </div>
          </motion.div>
          <FeaturePhone app={app} />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto mt-20 grid max-w-7xl gap-6 md:grid-cols-3"
        >
          {app.features.map((feature) => (
            <motion.div
              key={feature}
              variants={reveal}
              whileHover={{ y: -4, borderColor: "rgba(34, 211, 238, 0.35)" }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
            >
              <Check className="mb-4 text-[#22D3EE]" size={22} />
              <h2 className="text-lg font-semibold text-white">{feature}</h2>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto mt-20 grid max-w-7xl gap-8 lg:grid-cols-2"
        >
          <motion.div variants={reveal} className="rounded-2xl border border-white/10 bg-[#0D0D12] p-6 md:p-8">
            <Bell className="mb-5 text-[#93C5FD]" size={26} />
            <h2 className="text-3xl font-semibold text-white">
              Subscription Info
            </h2>
            <p className="mt-4 text-zinc-400">
              {app.name} Pro includes expanded tools for users who want more
              insight and customization.
            </p>
            <ul className="mt-6 space-y-3">
              {app.proFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-zinc-200">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={reveal} className="rounded-2xl border border-white/10 bg-[#0D0D12] p-6 md:p-8">
            <ShieldCheck className="mb-5 text-[#93C5FD]" size={26} />
            <h2 className="text-3xl font-semibold text-white">FAQ</h2>
            <div className="mt-6 space-y-5">
              {app.faq.slice(0, 4).map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {Array.isArray(item.answer)
                      ? item.answer.join(", ")
                      : item.answer}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={reveal}
          className="mx-auto mt-20 max-w-7xl rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-4">
            <Link href="/privacy" className="font-medium text-zinc-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-medium text-zinc-200">
              Terms
            </Link>
            <Link href="/eula" className="font-medium text-zinc-200">
              EULA
            </Link>
            <Link
              href={`/support/${app.slug}`}
              className="font-medium text-[#93C5FD]"
            >
              Support
            </Link>
          </div>
        </motion.section>
      </main>
    </>
  )
}
