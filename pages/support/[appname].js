import Head from "next/head"
import Link from "next/link"
import { Mail } from "lucide-react"
import { apps, getAppBySlug } from "@/lib/apps"

function Answer({ item }) {
  if (!Array.isArray(item.answer)) {
    return <p className="mt-3 leading-7 text-zinc-400">{item.answer}</p>
  }

  const List = item.ordered ? "ol" : "ul"

  return (
    <List className="mt-3 space-y-2 text-zinc-400">
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
        <section className="mx-auto max-w-4xl">
          <Link href="/support" className="text-sm font-semibold text-[#93C5FD]">
            Support Center
          </Link>
          <h1 className="mt-6 text-5xl font-semibold text-white md:text-7xl">
            {app.name} Support
          </h1>
          <p className="mt-5 text-xl leading-8 text-zinc-300">
            Welcome to {app.name} Support.
          </p>
          <p className="mt-4 text-lg leading-8 text-zinc-400">
            {app.supportIntro}
          </p>
        </section>

        <section className="mx-auto mt-16 max-w-4xl">
          <h2 className="text-3xl font-semibold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 divide-y divide-white/10 rounded-lg border border-white/10 bg-[#0D0D12]">
            {app.faq.map((item) => (
              <article key={item.question} className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Q: {item.question}
                </h3>
                <div className="text-zinc-400">
                  <span className="mt-3 block font-semibold text-zinc-200">
                    A:
                  </span>
                  <Answer item={item} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-4xl rounded-lg border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <Mail className="mb-5 text-[#93C5FD]" size={26} />
          <h2 className="text-3xl font-semibold text-white">Contact Support</h2>
          <div className="mt-6 grid gap-5 text-sm md:grid-cols-2">
            <div>
              <div className="text-zinc-500">Email</div>
              <a
                href={`mailto:${app.supportEmail}`}
                className="mt-1 block font-semibold text-[#CFFAFE]"
              >
                {app.supportEmail}
              </a>
            </div>
            <div>
              <div className="text-zinc-500">Developer</div>
              <div className="mt-1 font-semibold text-white">
                {app.developer}
              </div>
            </div>
            <div>
              <div className="text-zinc-500">App</div>
              <div className="mt-1 font-semibold text-white">
                {app.appName}
              </div>
            </div>
            <div>
              <div className="text-zinc-500">Response time</div>
              <div className="mt-1 font-semibold text-white">
                Usually within 24-48 hours
              </div>
            </div>
          </div>
        </section>
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
