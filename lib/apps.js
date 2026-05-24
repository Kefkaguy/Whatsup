export const apps = [
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
