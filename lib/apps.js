export const apps = [
  {
    slug: "boxspot",
    name: "BoxSpot",
    appName: "BoxSpot",
    icon: "BS",
    summary:
      "Home storage organization with digital boxes, QR labels, photos, notes, keywords, and searchable categories.",
    storeUrl: "#",
    privacyPath: "/boxspot/privacy",
    supportEmail: "erosimcity@gmail.com",
    developer: "Erik Gaboyan",
    responseTime: "Usually within 1-3 business days",
    features: [
      "Digital storage boxes",
      "QR code labels",
      "Photos and notes",
      "Searchable keywords",
      "Categories",
      "Family sharing",
    ],
    proFeatures: [
      "Printable QR label sheets",
      "Family sharing",
      "Advanced organization tools",
      "Storage setup export",
    ],
    supportSubtitle:
      "Need help? We're here to help you organize your home with confidence.",
    supportIntro:
      "BoxSpot helps you organize storage boxes, bins, closets, garages, and storage units using QR codes and simple searchable labels.",
    supportAbout:
      "Search your belongings and instantly know where you stored them.",
    supportFooter:
      "BoxSpot exists to help people spend less time searching and more time enjoying their home.",
    faq: [
      {
        question: "Does BoxSpot require an account?",
        answer: "No. BoxSpot works without creating an account.",
      },
      {
        question: "Is my data private?",
        answer:
          "Yes. Your data stays on your device and is not sold or shared with third parties.",
      },
      {
        question: "Does BoxSpot require an internet connection?",
        answer: "No. Most features work completely offline.",
      },
      {
        question: "Can I print QR labels?",
        answer: "Yes. BoxSpot Pro includes printable QR label sheets.",
      },
      {
        question: "Can I share my boxes with family members?",
        answer:
          "Yes. BoxSpot Pro allows you to share your storage setup with family members.",
      },
      {
        question: "I deleted the app. Can I recover my data?",
        answer:
          "If you created a backup, you can restore it. Otherwise, locally stored data is removed when the app is deleted.",
      },
      {
        question: "I found a bug or have an idea.",
        answer: [
          "We love hearing feedback.",
          "Please email erosimcity@gmail.com.",
        ],
      },
    ],
  },
  {
    slug: "liftcore",
    name: "LiftCore",
    appName: "LiftCore Workout Tracker",
    icon: "LC",
    summary:
      "Workout tracking, recovery intelligence, hydration, nutrition goals, and daily fitness habits.",
    storeUrl: "#",
    supportEmail: "erosimcity@gmail.com",
    developer: "Erik Gaboyan",
    features: [
      "Workout tracking",
      "Recovery tracking",
      "Water, protein, and fiber goals",
      "Progress tracking",
      "Smart reminders",
      "Saved workout templates",
    ],
    proFeatures: [
      "Smart Coach insights",
      "Recovery intelligence",
      "Advanced analytics",
      "Smart reminders",
      "Sleep reminders",
      "Saved workout templates",
    ],
    supportIntro:
      "LiftCore helps users track workouts, recovery, hydration, nutrition goals, and daily fitness habits.",
    faq: [
      {
        question: "Do I need an account?",
        answer: "No. LiftCore works without creating an account.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Your workout data, progress photos, reminders, and tracking information are stored locally on your device.",
      },
      {
        question: "How do I restore purchases?",
        answer: "Open LiftCore -> Settings -> Restore Purchases.",
      },
      {
        question: "How do I manage or cancel my subscription?",
        answer: "Open iPhone Settings -> Apple ID -> Subscriptions.",
      },
      {
        question: "What does LiftCore Pro include?",
        answer: [
          "Smart Coach insights",
          "Recovery intelligence",
          "Advanced analytics",
          "Smart reminders",
          "Sleep reminders",
          "Saved workout templates",
        ],
      },
      {
        question: "My reminders are not appearing.",
        answer: [
          "Open iPhone Settings",
          "Tap Notifications",
          "Select LiftCore",
          "Enable Allow Notifications",
        ],
        ordered: true,
      },
    ],
  },
  {
    slug: "petcare",
    name: "PetCare+",
    appName: "PetCare+",
    icon: "P+",
    summary:
      "Pet medications, care reminders, health logs, and multiple pet management.",
    storeUrl: "#",
    supportEmail: "erosimcity@gmail.com",
    developer: "Erik Gaboyan",
    features: [
      "Pet medications",
      "Care reminders",
      "Health logs",
      "Multiple pet management",
    ],
    proFeatures: ["Care reminders", "Health logs", "Medication tracking"],
    supportIntro:
      "PetCare+ helps pet owners organize reminders, medication schedules, and care history.",
    faq: [
      {
        question: "Do I need an account?",
        answer: "No. PetCare+ is designed around local-first use.",
      },
      {
        question: "Where is my data stored?",
        answer: "Your pet care information is stored locally on your device.",
      },
    ],
  },
]

export const supportCategories = [
  "BoxSpot",
  "PetCare+",
  "LiftCore",
  "Billing",
  "App issues",
  "Frequently asked questions",
  "Legal",
]

export function getAppBySlug(slug) {
  return apps.find((app) => app.slug === slug)
}
