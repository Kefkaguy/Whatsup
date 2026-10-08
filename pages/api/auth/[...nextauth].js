import NextAuth from "next-auth"
import { adminAuthReady, authOptions } from "@/lib/auth"

export default function handler(req, res) {
  if (!adminAuthReady()) return res.status(503).json({ error: "Sign-in is not available yet." })
  return NextAuth(req, res, authOptions)
}
