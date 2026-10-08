import GitHubProvider from "next-auth/providers/github"
import { ownerAllowed } from "./ideas-server.mjs"

export function adminAuthReady() {
  return Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET && ownerAllowed("github", process.env.IDEAS_ADMIN_GITHUB_ID) &&
    process.env.NEXTAUTH_SECRET?.length >= 32 && process.env.NEXTAUTH_URL)
}
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  providers: [GitHubProvider({ clientId: process.env.GITHUB_ID || "", clientSecret: process.env.GITHUB_SECRET || "" })],
  callbacks: {
    async signIn({ account, profile }) {
      return adminAuthReady() && ownerAllowed(account?.provider, profile?.id)
    },
    async jwt({ token, account, profile }) {
      if (account) token.githubId = account.provider === "github" ? String(profile?.id) : null
      return token
    },
    async session({ session, token }) {
      session.isAdmin = adminAuthReady() && ownerAllowed("github", token.githubId)
      return session
    },
  },
}
