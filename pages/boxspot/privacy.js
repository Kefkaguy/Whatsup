import Head from "next/head"
import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, QrCode, Share2, Trash2 } from "lucide-react"

const sections = [
  {
    title: "What BoxSpot Does",
    body:
      "BoxSpot is a home storage organization app. You can create digital storage boxes and add names, notes, keywords, categories, photos, and QR codes to help organize your belongings.",
  },
  {
    title: "Data Storage",
    body:
      "All user data is stored locally on your device using Apple's local storage technologies. Photos, notes, QR codes, categories, and box information remain on your device.",
  },
  {
    title: "Optional Future Backup",
    body:
      "If future versions include optional backup or iCloud synchronization, those features will be optional and controlled by you.",
  },
  {
    title: "Children's Privacy",
    body:
      "BoxSpot does not knowingly collect personal information from children.",
  },
  {
    title: "Policy Updates",
    body:
      "This Privacy Policy may be updated occasionally. Any changes will be reflected on this page.",
  },
]

const notCollected = [
  "Name",
  "Email address",
  "Phone number",
  "Address",
  "Contacts",
  "Location data",
  "Advertising identifiers",
  "Usage analytics",
  "Financial information",
  "Health information",
]

export default function BoxSpotPrivacyPage() {
  return (
    <>
      <Head>
        <title>BoxSpot Privacy Policy | KefCore</title>
        <meta
          name="description"
          content="Privacy Policy for BoxSpot, a local-first home storage organization app."
        />
      </Head>

      <main className="px-5 pb-20 pt-32 md:px-8">
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl"
        >
          <Link href="/boxspot" className="text-sm font-semibold text-[#506754]">
            BoxSpot
          </Link>
          <h1 className="mt-6 text-5xl font-semibold leading-tight text-[#1B1814] md:text-7xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-xl leading-8 text-[#4E493E]">
            Your storage information belongs to you. BoxSpot is designed to keep
            it that way.
          </p>
        </motion.section>

        <section className="mx-auto mt-14 grid max-w-4xl gap-5">
          <div className="rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8">
            <Lock className="mb-5 text-[#5B7875]" size={28} />
            <h2 className="text-2xl font-semibold text-[#1B1814]">
              Privacy by Design
            </h2>
            <p className="mt-4 leading-7 text-[#4E493E]">
              BoxSpot does not require an account, does not require personal
              information, does not show advertisements, does not use analytics
              tracking, and does not include third-party advertising SDKs. We do
              not sell user data and do not share user data with third parties.
            </p>
          </div>

          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold text-[#1B1814]">
                {section.title}
              </h2>
              <p className="mt-4 leading-7 text-[#4E493E]">{section.body}</p>
            </article>
          ))}

          <article className="rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#1B1814]">
              Information BoxSpot Does Not Collect
            </h2>
            <p className="mt-4 leading-7 text-[#4E493E]">
              BoxSpot simply stores the information you voluntarily enter for
              organizing your own belongings. BoxSpot does not collect:
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {notCollected.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#C2A072]/30 bg-[#F0ECE3] px-4 py-3 text-sm font-medium text-[#1B1814]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8">
            <QrCode className="mb-5 text-[#5B7875]" size={28} />
            <h2 className="text-2xl font-semibold text-[#1B1814]">QR Codes</h2>
            <p className="mt-4 leading-7 text-[#4E493E]">
              QR codes are generated locally and are only used to identify boxes
              within your own storage system.
            </p>
          </article>

          <article className="rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8">
            <Share2 className="mb-5 text-[#5B7875]" size={28} />
            <h2 className="text-2xl font-semibold text-[#1B1814]">
              Family Sharing
            </h2>
            <p className="mt-4 leading-7 text-[#4E493E]">
              When you choose to share your BoxSpot setup, the export is
              initiated manually by you and is only shared with recipients you
              explicitly choose.
            </p>
          </article>

          <article className="rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8">
            <Trash2 className="mb-5 text-[#5B7875]" size={28} />
            <h2 className="text-2xl font-semibold text-[#1B1814]">
              Data Deletion
            </h2>
            <p className="mt-4 leading-7 text-[#4E493E]">
              Deleting the app removes locally stored data unless you have
              created your own backup.
            </p>
          </article>

          <article className="rounded-2xl border border-[#C2A072]/30 bg-[#F8F4E9] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#1B1814]">Contact</h2>
            <p className="mt-4 leading-7 text-[#4E493E]">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <a
              href="mailto:erosimcity@gmail.com"
              className="mt-4 inline-flex font-semibold text-[#506754]"
            >
              erosimcity@gmail.com
            </a>
          </article>
        </section>
      </main>
    </>
  )
}
