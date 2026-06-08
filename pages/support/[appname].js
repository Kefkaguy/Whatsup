import Head from "next/head"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { apps, getAppBySlug } from "@/lib/apps"

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

function Answer({ item }) {
  if (!Array.isArray(item.answer)) {
    return <p className="mt-3 leading-7 text-[#4E493E]">{item.answer}</p>
  }

  const List = item.ordered ? "ol" : "ul"

  return (
    <List className="mt-3 space-y-2 text-[#4E493E]">
      {item.answer.map((line) => (
        <li key={line} className={item.ordered ? "ml-5 list-decimal" : "ml-5 list-disc"}>
          {line}
        </li>
      ))}
    </List>
  )
}

export default function AppSupportPage({ app }) {
  return (
    <>
      <Head>
        <title>{app.name} Support | KefCore</title>
        <meta name="description" content={`${app.name} support and FAQ.`} />
      </Head>

      <main className="px-5 pb-20 pt-32 md:px-8">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          <Link href="/support" className="text-sm font-semibold text-[#506754]">
            Support Center
          </Link>
          <motion.h1 variants={reveal} className="mt-6 text-5xl font-semibold text-[#1B1814] md:text-7xl">
            {app.name} Support
          </motion.h1>
          <motion.p variants={reveal} className="mt-5 text-xl leading-8 text-[#4E493E]">
            {app.supportSubtitle || `Welcome to ${app.name} Support.`}
          </motion.p>
          <motion.p variants={reveal} className="mt-4 text-lg leading-8 text-[#4E493E]">
            {app.supportIntro}
          </motion.p>
          {app.supportAbout && (
            <motion.p variants={reveal} className="mt-3 text-lg leading-8 text-[#4E493E]">
              {app.supportAbout}
            </motion.p>
          )}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto mt-16 max-w-4xl"
        >
          <h2 className="text-3xl font-semibold text-[#1B1814]">
            Frequently Asked Questions
          </h2>
          <motion.div variants={reveal} className="mt-6 divide-y divide-[#C2A072]/30 rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9]">
            {app.faq.map((item) => (
              <motion.article
                key={item.question}
                whileHover={{ backgroundColor: "rgba(240, 236, 227, 0.72)" }}
                className="p-6"
              >
                <h3 className="text-lg font-semibold text-[#1B1814]">
                  Q: {item.question}
                </h3>
                <div className="text-[#4E493E]">
                  <span className="mt-3 block font-semibold text-[#1B1814]">
                    A:
                  </span>
                  <Answer item={item} />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={reveal}
          className="mx-auto mt-16 max-w-4xl rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8"
        >
          <Mail className="mb-5 text-[#5B7875]" size={26} />
          <h2 className="text-3xl font-semibold text-[#1B1814]">Contact Support</h2>
          <div className="mt-6 grid gap-5 text-sm md:grid-cols-2">
            <div>
              <div className="text-[#4E493E]">Email</div>
              <a
                href={`mailto:${app.supportEmail}`}
                className="mt-1 block font-semibold text-[#506754]"
              >
                {app.supportEmail}
              </a>
            </div>
            <div>
              <div className="text-[#4E493E]">Developer</div>
              <div className="mt-1 font-semibold text-[#1B1814]">
                {app.developer}
              </div>
            </div>
            <div>
              <div className="text-[#4E493E]">App</div>
              <div className="mt-1 font-semibold text-[#1B1814]">
                {app.appName}
              </div>
            </div>
            <div>
              <div className="text-[#4E493E]">Response time</div>
              <div className="mt-1 font-semibold text-[#1B1814]">
                {app.responseTime || "Usually within 24-48 hours"}
              </div>
            </div>
          </div>
        </motion.section>

        {app.supportFooter && (
          <p className="mx-auto mt-12 max-w-4xl text-sm leading-6 text-[#4E493E]">
            Made with care by KefCore. {app.supportFooter}
          </p>
        )}
      </main>
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: apps.map((app) => ({ params: { appname: app.slug } })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  return {
    props: {
      app: getAppBySlug(params.appname),
    },
  }
}
