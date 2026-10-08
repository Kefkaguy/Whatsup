import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Database, LockKeyhole, Mail, ShieldCheck } from "lucide-react"
import Reveal from "@/components/Reveal"
import Footer from "@/components/Footer"

const contents = [
  { id: "overview", label: "Our approach" },
  { id: "website", label: "Website app ideas" },
  { id: "boxspot", label: "BoxSpot privacy" },
  { id: "deletion", label: "Deleting your data" },
  { id: "contact", label: "Questions & contact" },
]

const boxspotSections = [
  { title: "What BoxSpot does", body: "BoxSpot is a home storage organization app. You can create digital storage boxes and add names, notes, keywords, categories, photos, and QR codes to help organize your belongings." },
  { title: "Data storage", body: "All user data is stored locally on your device using Apple's local storage technologies. Photos, notes, QR codes, categories, and box information remain on your device." },
  { title: "QR codes", body: "QR codes are generated locally and are only used to identify boxes within your own storage system." },
  { title: "Family sharing", body: "When you choose to share your BoxSpot setup, the export is initiated manually by you and is only shared with recipients you explicitly choose." },
  { title: "Optional future backup", body: "If future versions include optional backup or iCloud synchronization, those features will be optional and controlled by you." },
  { title: "Children's privacy", body: "BoxSpot does not knowingly collect personal information from children." },
  { title: "Policy updates", body: "This Privacy Policy may be updated occasionally. Any changes will be reflected on this page." },
]

const notCollected = ["Name", "Email address", "Phone number", "Address", "Contacts", "Location data", "Advertising identifiers", "Usage analytics", "Financial information", "Health information"]

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | KefCore</title>
        <meta name="description" content="Read about KefCore's local-first approach to privacy, BoxSpot data storage and sharing, and how to contact us about your information." />
      </Head>
      <main className="privacy-page shell">
        <Link href="/support" className="breadcrumb"><ArrowLeft size={15} />Support center</Link>
        <Reveal as="section" className="privacy-hero">
          <div>
            <span className="eyebrow">KefCore / Your information</span>
            <h1>Privacy Policy<span>Your privacy.<br /><em>By design.</em></span></h1>
            <p>Your information belongs to you. Here’s a clear look at how our apps handle it, and where to turn if you have questions.</p>
          </div>
          <div className="privacy-emblem" aria-hidden="true"><div className="privacy-emblem-ring" /><ShieldCheck size={85} strokeWidth={1} /><span>Thoughtfully built.<br />Privacy first.</span></div>
        </Reveal>
        <Reveal className="privacy-principles">
          <div><LockKeyhole size={21} strokeWidth={1.5} /><span>Privacy-first principles</span></div>
          <div><Database size={21} strokeWidth={1.5} /><span>A local-first foundation</span></div>
          <div><Mail size={21} strokeWidth={1.5} /><span>A direct line to support</span></div>
        </Reveal>
        <div className="privacy-layout">
          <aside className="privacy-sidebar">
            <nav aria-label="Privacy policy sections"><span className="eyebrow">On this page</span>{contents.map((item, index) => <a key={item.id} href={`#${item.id}`}><span>0{index + 1}</span>{item.label}</a>)}</nav>
            <Link href="/support" className="text-link">Visit support <ArrowUpRight size={16} /></Link>
          </aside>
          <div className="privacy-sections">
            <Reveal as="section" id="overview" className="privacy-section">
              <span className="eyebrow">01 / Our approach</span><h2>Built around your privacy.</h2>
              <p>KefCore apps are built with privacy-first, local-first principles. App data is stored on your device unless a specific app feature clearly states otherwise.</p>
              <p>The following app-specific details explain how BoxSpot handles the information you enter.</p>
            </Reveal>
            <Reveal as="section" id="website" className="privacy-section">
              <span className="eyebrow">02 / Website app ideas</span><h2>A shared notebook, with a little care.</h2>
              <p>The website’s idea board is an online feature, separate from the local storage used by our apps. When you submit an idea, we save its title, description, category, optional nickname, submission date, and review status in MongoDB. Approved ideas and nicknames are visible to everyone on the board. Please leave out private or sensitive information.</p>
              <p>To reduce spam, we keep a keyed hash of your connection’s IP address in temporary rate-limit records. These expire within roughly 48 hours; raw IP addresses are not saved in idea submissions or rate-limit records. Our hosting and security providers may process connection information to deliver and protect the website.</p>
              <p>Cloudflare Turnstile checks submissions for bots. The private review page uses GitHub sign-in for the owner. Submitted ideas remain stored until removed by the owner; to request removal, contact <a href="mailto:erosimcity@gmail.com">erosimcity@gmail.com</a> with the idea’s title and relevant details.</p>
            </Reveal>
            <Reveal as="section" id="boxspot" className="privacy-section">
              <span className="eyebrow">03 / BoxSpot</span><h2>Your storage information stays yours.</h2>
              <p>BoxSpot does not require an account, does not require personal information, does not show advertisements, does not use analytics tracking, and does not include third-party advertising SDKs. We do not sell user data and do not share user data with third parties.</p>
              {boxspotSections.slice(0, 2).map(section => <div className="privacy-subsection" key={section.title}><h3>{section.title}</h3><p>{section.body}</p></div>)}
              <div className="privacy-subsection"><h3>Information BoxSpot does not collect</h3><p>BoxSpot simply stores the information you voluntarily enter for organizing your own belongings. BoxSpot does not collect:</p><ul className="privacy-data-list">{notCollected.map(item => <li key={item}><span aria-hidden="true" />{item}</li>)}</ul></div>
              {boxspotSections.slice(2).map(section => <div className="privacy-subsection" key={section.title}><h3>{section.title}</h3><p>{section.body}</p></div>)}
            </Reveal>
            <Reveal as="section" id="deletion" className="privacy-section">
              <span className="eyebrow">04 / Your data</span><h2>Deleting your data.</h2>
              <p>For BoxSpot, deleting the app removes locally stored data unless you have created your own backup.</p>
              <Link href="/data-deletion" className="text-link">Data deletion information <ArrowUpRight size={16} /></Link>
            </Reveal>
            <Reveal as="section" id="contact" className="privacy-section privacy-contact">
              <span className="eyebrow">05 / Questions & contact</span><h2>Let’s make it clear.</h2>
              <p>If you have questions about this Privacy Policy or need support, email us. Include the app name and a short description of your question or issue.</p>
              <a href="mailto:erosimcity@gmail.com?subject=Privacy%20question" className="text-link">erosimcity@gmail.com <ArrowUpRight size={17} /></a>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
