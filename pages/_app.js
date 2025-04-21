import "@/styles/globals.css"
import React, { useState, useRef } from "react"
import { FaPlay, FaPause } from "react-icons/fa"
import AdvancedNavbar from "@/components/navbar/Navbar"
import { AnimatePresence } from "framer-motion"

export default function App({ Component, pageProps }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <div className="relative w-full overflow-y-auto overflow-x-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 text-white text-sm">
          <button
            onClick={toggleVideo}
            className="bg-black/50 hover:bg-black/70 p-3 rounded-full transition flex items-center justify-center"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <span className="opacity-70">Video by Serg Pedan</span>
        </div>

        <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-[-1]" />
        <AdvancedNavbar />
        <Component {...pageProps} />
      </div>
    </AnimatePresence>
  )
}
