import Head from "next/head"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Search } from "lucide-react"
import { apps, supportCategories } from "@/lib/apps"

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function SupportCenter() {
  return (
    <>
      <Head>
        <title>Support | KefCore</title>
        <meta
          name="description"
          content="KefCore support center for apps, billing, legal, and contact."
        />
      </Head>

      <main className="px-5 pb-20 pt-32 md:px-8">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.h1 variants={reveal} className="text-5xl font-semibold text-[#1B1814] md:text-7xl">
            Support Center
          </motion.h1>
          <motion.div variants={reveal} className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] px-5 py-4 text-left text-[#4E493E]">
            <Search size={20} />
            How can we help?
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto mt-16 grid max-w-7xl gap-4 md:grid-cols-3"
        >
          {supportCategories.map((category) => (
            <motion.div
              key={category}
              variants={reveal}
              whileHover={{ y: -3, borderColor: "rgba(91, 120, 117, 0.42)" }}
              className="rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-5 text-lg font-semibold text-[#1B1814]"
            >
              {category}
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto mt-16 max-w-7xl"
        >
          <h2 className="text-3xl font-semibold text-[#1B1814]">App Support</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {apps.map((app) => (
              <motion.div
                key={app.slug}
                variants={reveal}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/support/${app.slug}`}
                  className="group block rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 transition hover:border-[#506754]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-2xl font-semibold text-[#1B1814]">
                        {app.name}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#4E493E]">
                        {app.supportIntro}
                      </p>
                    </div>
                    <ArrowRight
                      className="text-[#C2A072] transition group-hover:text-[#5B7875]"
                      size={20}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={reveal}
          className="mx-auto mt-16 max-w-7xl rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8"
        >
          <Mail className="mb-5 text-[#5B7875]" size={26} />
          <h2 className="text-3xl font-semibold text-[#1B1814]">Contact</h2>
          <p className="mt-4 text-[#4E493E]">
            Email support for help with KefCore apps.
          </p>
          <a
            href="mailto:erosimcity@gmail.com"
            className="mt-6 inline-flex rounded-xl bg-[#506754] px-5 py-3 text-sm font-semibold text-[#F8F4E9]"
          >
            erosimcity@gmail.com
          </a>
        </motion.section>
      </main>
    </>
  )
}
