import { Database, Code2, Layers, Workflow, Server, Wrench, Smartphone, Gamepad2, Palette } from "lucide-react"
import { TbBrandWindows, TbBrandVscode, TbBrandVisualStudio } from "react-icons/tb"
import {
  SiJavascript, SiTypescript, SiGnubash, SiHtml5, SiCss3, SiReact, SiNextdotjs, SiTailwindcss,
  SiMongodb, SiMysql, SiPostgresql, SiSqlite, SiFirebase, SiSupabase, SiNodedotjs, SiNpm,
  SiGit, SiGithub, SiGitlab, SiDocker, SiLinux, SiUbuntu, SiApple, SiApache, SiNginx,
  SiPostman, SiPycharm, SiPython, SiOpenjdk, SiC, SiCplusplus, SiSharp, SiGo, SiRust,
  SiSwift, SiKotlin, SiRuby, SiFlutter, SiUnity, SiUnrealengine, SiBlender, SiFigma,
  SiAdobephotoshop, SiAdobeillustrator,
} from "react-icons/si"

export const technologyIcons = {
  JavaScript: SiJavascript, TypeScript: SiTypescript, "Bash / Shell": SiGnubash, SQL: Database,
  HTML: SiHtml5, CSS: SiCss3, React: SiReact, "Next.js": SiNextdotjs, "Tailwind CSS": SiTailwindcss,
  MongoDB: SiMongodb, MySQL: SiMysql, PostgreSQL: SiPostgresql, SQLite: SiSqlite,
  Firebase: SiFirebase, Supabase: SiSupabase, "Node.js": SiNodedotjs, npm: SiNpm,
  Git: SiGit, GitHub: SiGithub, GitLab: SiGitlab, Docker: SiDocker,
  Linux: SiLinux, Ubuntu: SiUbuntu, Windows: TbBrandWindows, macOS: SiApple,
  Apache: SiApache, Nginx: SiNginx, Postman: SiPostman,
  "Visual Studio Code": TbBrandVscode, "Visual Studio": TbBrandVisualStudio, PyCharm: SiPycharm,
  Python: SiPython, Java: SiOpenjdk, C: SiC, "C++": SiCplusplus, "C#": SiSharp,
  Go: SiGo, Rust: SiRust, Swift: SiSwift, Kotlin: SiKotlin, Ruby: SiRuby,
  "React Native": SiReact, Flutter: SiFlutter, SwiftUI: SiSwift,
  Unity: SiUnity, "Unreal Engine": SiUnrealengine, Blender: SiBlender, Figma: SiFigma,
  "Adobe Photoshop": SiAdobephotoshop, "Adobe Illustrator": SiAdobeillustrator,
}

// Primary tools and introductory familiarity reflect the owner's supplied lists.
export const mainStack = [
  { title: "Languages", icon: Code2, tone: "amber", tools: ["JavaScript", "TypeScript", "Bash / Shell", "SQL", "HTML", "CSS"] },
  { title: "Interfaces", icon: Layers, tone: "blue", tools: ["React", "Next.js", "Tailwind CSS"] },
  { title: "Databases & services", icon: Database, tone: "green", tools: ["MongoDB", "MySQL", "PostgreSQL", "SQLite", "Firebase", "Supabase"] },
  { title: "Runtime & workflow", icon: Workflow, tone: "rose", tools: ["Node.js", "npm", "Git", "GitHub", "GitLab", "Docker"] },
  { title: "Systems & servers", icon: Server, tone: "purple", tools: ["Linux", "Ubuntu", "Windows", "macOS", "Apache", "Nginx"] },
  { title: "Everyday tools", icon: Wrench, tone: "slate", tools: ["Postman", "Visual Studio Code", "Visual Studio", "PyCharm"] },
]
export const exploringStack = [
  { title: "Languages", icon: Code2, tools: ["Python", "Java", "C", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "Ruby"] },
  { title: "Mobile & cross-platform", icon: Smartphone, tools: ["React Native", "Flutter", "SwiftUI"] },
  { title: "Game development", icon: Gamepad2, tools: ["Unity", "Unreal Engine"] },
  { title: "3D & design", icon: Palette, tools: ["Blender", "Figma", "Adobe Photoshop", "Adobe Illustrator"] },
]

export const webProjects = [
  { id: "chic-design", title: "Chic Design", category: "Business sites", kind: "Salon website", url: "https://chicdesign.vercel.app/", description: "An editorial salon website with bold typography, a service menu, and a direct path to contact.", tone: "rust" },
  { id: "california-detail", title: "California Detail Shop", category: "Business sites", kind: "Auto detailing website", url: "https://caldetail.vercel.app/", description: "A detailing website that brings services, a visual gallery, and contact details into one place.", tone: "blue" },
  { id: "overhaul", title: "OverHaul", category: "Experiments", kind: "Civic platform concept", url: "https://over-haul.vercel.app/", description: "A civic platform concept for reporting local problems, voting on priorities, and following fixes.", tone: "amber" },
  { id: "kefka-3d", title: "Kefka in 3D", category: "Portfolios", kind: "Generative design portfolio", url: "https://portfolio3d-gamma-topaz.vercel.app/", description: "A design portfolio exploring moving forms, 3D presentation, and a distinctive visual identity.", tone: "purple" },
  { id: "kefka-portfolio", title: "Kefka / Developer", category: "Portfolios", kind: "Personal portfolio experiment", url: "https://portfolio2-beige-five.vercel.app/", description: "A developer portfolio experiment with oversized lettering and a bold project showcase.", tone: "green" },
  { id: "kefka-studio", title: "Kefka / Digital Studio", category: "Portfolios", kind: "Studio portfolio experiment", url: "https://kefka1.vercel.app/", description: "A digital studio concept exploring dramatic typography, project presentation, and a contact section.", tone: "slate" },
]
export const projectFilters = ["All websites", "Business sites", "Portfolios", "Experiments"]
