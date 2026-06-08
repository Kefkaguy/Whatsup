import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function services() {
  return (
    <div className="min-h-screen w-full bg-[#F0ECE3] text-[#1B1814]">
      <div className="px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="flex flex-col">
              {/* Main Heading */}
              <div className="mb-8">
                <h1 className="flex flex-col text-6xl md:text-7xl font-bold">
                  <span className="mb-2 inline-block w-fit rounded-xl bg-[#F8F4E9] p-2 text-[#1B1814] shadow-[0_16px_40px_rgba(194,160,114,0.18)]">
                    Unlock Your
                  </span>
                  <span className="mb-2 inline-block w-fit rounded-xl bg-[#F8F4E9] p-2 text-[#1B1814] shadow-[0_16px_40px_rgba(194,160,114,0.18)]">
                    Potential With
                  </span>
                  <span className="inline-block w-fit rounded-xl bg-[#F8F4E9] p-2 text-[#1B1814] shadow-[0_16px_40px_rgba(194,160,114,0.18)]">Us</span>
                </h1>
              </div>

              {/* Our Services */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-[#5B7875]">*</span>
                  <span className="text-[#4E493E]">Our Services</span>
                </div>
              </div>

              {/* CTA Button with glow effect */}
              <div className="">
                <motion.button
                  className="relative rounded-full border border-[#506754]/35 bg-[#506754] px-8 py-3 text-[#F8F4E9]"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 18px 40px rgba(80,103,84,0.24)",
                  }}
                >
                  <Link target="_blank" href="https://www.fiverr.com/s/DB774dV">
                    Work with us!
                  </Link>
                </motion.button>
              </div>

              <div className="flex justify-center">
                <Image src="/Kefka.png" alt="Kefka" width={300} height={300} />
              </div>

              {/* Services List */}
              <div className="ml-auto flex flex-col gap-8 text-4xl text-[#4E493E] md:text-right md:text-6xl">
                <h2>Website Design</h2>
                <h2>Development</h2>
                <h2>SEO + CMS</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
