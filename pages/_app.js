import "@/styles/globals.css"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import AdvancedNavbar from "@/components/navbar/Navbar"

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F0ECE3] text-[#1B1814]">
      <AdvancedNavbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
