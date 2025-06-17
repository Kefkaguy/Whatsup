import React, { useEffect, useState } from "react"
import { TextEffect } from "@/components/core/text-effect"
import ScrollDown from "@/public/svg/ScrollDown"
import BlurFade from "@/components/magicui/blur-fade"
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity"
import { motion } from "framer-motion"
import AdvancedNavbar from "@/components/navbar/Navbar"
import AwardIcon from "@/components/animations/AwardIcon"
import { MagicCard } from "@/components/magicui/magic-card"

export default function ResponsiveWhatsUpDashboard() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  )

  const images = [
    "https://static-cse.canva.com/blob/1626008/ComposeStunningImages16.jpg",
  ]
  const links = [
    "https://static-cse.canva.com/blob/1626008/ComposeStunningImages16.jpg",
  ]

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getRandomColor = () => {
    const letters = "89ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)]
    }
    return color
  }

  const fancyVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
    item: {
      hidden: () => ({
        opacity: 0,
        y: Math.random() * 100 - 50,
        rotate: Math.random() * 90 - 45,
        scale: 0.3,
        color: getRandomColor(),
      }),
      visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        color: getRandomColor(),
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
    },
  }

  return (
    <main>
      <section className=" min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
        <TextEffect
          per="char"
          variants={fancyVariants}
          className="text-[clamp(4rem,15vw,512px)] font-bold tracking-tighter text-white"
        >
          What's up
        </TextEffect>

        <motion.div
          className="mt-16 sm:mt-24 md:mt-32 lg:mt-40 xl:mt-48"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ScrollDown />
        </motion.div>
      </section>

      <section className="w-screen py-24 sm:py-24 md:py-32 lg:py-40 xl:py-64">
        <VelocityScroll
          text="Welcome"
          default_velocity={3}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-9xl md:leading-[5rem]"
        />
      </section>
      <section className="min-h-screen flex items-center justify-center p-4">
        <div className="columns-1 sm:columns-2  bg-red-400 lg:columns-3 gap-4">
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
              <div className="mb-4 transform translate-y-4">
                <a
                  href={links[idx]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  <img
                    className="w-full h-auto object-cover"
                    src={imageUrl}
                    alt={`Random stock image ${idx + 1}`}
                  />
                </a>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>
      <section className="py-24 flex flex-col items-center gap-8">
        <AwardIcon size={120} />
        <BlurFade inView>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Award-Winning Animations
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <p className="max-w-2xl text-center text-lg md:text-xl">
            We craft smooth and immersive experiences that captivate users.
          </p>
        </BlurFade>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <MagicCard className="p-6">
            <h3 className="text-xl font-bold mb-2">Project Alpha</h3>
            <p>Innovative design meets seamless performance.</p>
          </MagicCard>
          <MagicCard className="p-6">
            <h3 className="text-xl font-bold mb-2">Project Beta</h3>
            <p>Interactive experiences built with cutting-edge tech.</p>
          </MagicCard>
          <MagicCard className="p-6">
            <h3 className="text-xl font-bold mb-2">Project Gamma</h3>
            <p>Engaging, responsive, and user-friendly.</p>
          </MagicCard>
          <MagicCard className="p-6">
            <h3 className="text-xl font-bold mb-2">Project Delta</h3>
            <p>Sleek interfaces with robust architecture.</p>
          </MagicCard>
        </div>
      </section>

      <section className="py-24 flex flex-col items-center gap-6">
        <BlurFade inView>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            About Us
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <p className="max-w-3xl text-center text-lg md:text-xl">
            We are a team of creatives passionate about delivering memorable
            digital experiences. Our goal is to combine modern technologies with
            refined design to help brands stand out.
          </p>
        </BlurFade>
      </section>
    </main>
  )
}
