import Head from "next/head"
import { motion } from "framer-motion"

export default function LegalPage({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} | KefCore</title>
      </Head>
      <main className="px-5 pb-20 pt-32 md:px-8">
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="text-5xl font-semibold text-white md:text-6xl">
            {title}
          </h1>
          <div className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-[#0D0D12] p-6 leading-7 text-zinc-400 md:p-8">
            {children}
          </div>
        </motion.section>
      </main>
    </>
  )
}
