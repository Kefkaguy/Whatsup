import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart } from "lucide-react"
import Link from "next/link"

const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "About",
    href: "/",
  },
]

const AdvancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      x: "100%",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      x: "0%",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, rotateX: 90, translateY: 80, translateX: -20 },
    open: (i) => ({
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      translateX: 0,
      transition: {
        duration: 0.65,
        delay: 0.5 + i * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
        opacity: { duration: 0.35 },
      },
    }),
  }

  const backgroundVariants = {
    closed: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.5 },
    },
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 ">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center backdrop-blur-sm rounded-b-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          Kefka
        </motion.h1>
        <div className="flex items-center space-x-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            <Link target="_blank" href="https://www.fiverr.com/s/DB774dV">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="focus:outline-none text-lg font-medium"
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              variants={backgroundVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={toggleMenu}
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white p-10 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                  className="focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.title}
                      variants={menuItemVariants}
                      custom={i}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      onHoverStart={() => setActiveIndex(i)}
                      onHoverEnd={() => setActiveIndex(null)}
                      className="relative overflow-hidden perspective"
                    >
                      <a
                        href={item.href}
                        className="block text-4xl md:text-6xl lg:text-7xl font-bold py-4 transition-colors duration-300 hover:text-gray-500"
                      >
                        {item.title}
                      </a>
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: activeIndex === i ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-gray-500 mt-8"
                >
                  © 2024 Kefka. All rights reserved.
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default AdvancedNavbar
