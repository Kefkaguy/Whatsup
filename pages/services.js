import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function services() {
  return (
    <div className="h-screen w-full ">
      <div className="px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="flex flex-col">
              {/* Main Heading */}
              <div className="mb-8">
                <h1 className="flex flex-col text-6xl md:text-7xl font-bold">
                  <span className="bg-black inline-block p-2 mb-2 w-fit">
                    Unlock Your
                  </span>
                  <span className="bg-black inline-block p-2 mb-2 w-fit">
                    Potential With
                  </span>
                  <span className="bg-black inline-block p-2 w-fit">Us</span>
                </h1>
              </div>

              {/* Our Services */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">✦</span>
                  <span className="text-gray-300">Our Services</span>
                </div>
              </div>

              {/* CTA Button with glow effect */}
              <div className="">
                <motion.button
                  className="bg-black text-white border border-[#D0FE1D] rounded-full px-8 py-3 relative"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px #D0FE1D",
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
              <div className="flex flex-col gap-8 md:text-right ml-auto text-4xl md:text-6xl text-gray-300">
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
