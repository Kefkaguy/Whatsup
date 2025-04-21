import React from "react"
import { motion } from "framer-motion"

export default function services() {
  const servicesList = [
    {
      title: "Web Development",
      description:
        "Creating responsive, modern websites and web applications using Next.js and React.",
      icon: "💻",
    },
    {
      title: "Mobile Development",
      description:
        "Building native iOS applications using Swift with clean architecture and intuitive UI/UX.",
      icon: "📱",
    },
    {
      title: "UI/UX Design",
      description:
        "Designing beautiful, user-friendly interfaces that enhance user experience across platforms.",
      icon: "🎨",
    },
    {
      title: "API Integration",
      description:
        "Connecting your applications to third-party services and creating robust backend solutions.",
      icon: "🔌",
    },
    {
      title: "Code Optimization",
      description:
        "Improving performance and efficiency of existing applications through refactoring and optimization.",
      icon: "⚡",
    },
    {
      title: "Consultation",
      description:
        "Technical advice and project planning for your Next.js and Swift development needs.",
      icon: "💡",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -5,
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="h-full w-full">
      <section className="min-h-screen flex flex-col pt-44 items-center p-4 overflow-hidden">
        <motion.p
          className="font-jetbrains font-bold text-3xl mb-16"
          initial={{ opacity: 0, y: -20 }}
          z
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Services I offer
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              className="border border-gray-300 rounded-2xl p-6 backdrop-blur-md bg-white/10 shadow-lg"
              variants={item}
              whileHover="hover"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/15 backdrop-blur-lg">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className="font-jetbrains font-bold text-xl mb-4">
                {service.title}
              </h3>
              <p className="font-jetbrains text-sm opacity-85 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
