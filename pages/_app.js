import "@/styles/globals.css"
import localFont from "next/font/local"
import AdvancedNavbar from "@/components/navbar/Navbar"

const geist = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist", display: "swap" })

export default function App({ Component, pageProps }) {
  return <div className={`site-root ${geist.variable}`}><AdvancedNavbar /><Component {...pageProps} /></div>
}
