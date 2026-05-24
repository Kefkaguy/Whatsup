import Head from "next/head"

export default function LegalPage({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} | KefCore</title>
      </Head>
      <main className="px-5 pb-20 pt-32 md:px-8">
        <section className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-semibold text-white md:text-6xl">
            {title}
          </h1>
          <div className="mt-8 space-y-5 rounded-lg border border-white/10 bg-[#0D0D12] p-6 leading-7 text-zinc-400 md:p-8">
            {children}
          </div>
        </section>
      </main>
    </>
  )
}
