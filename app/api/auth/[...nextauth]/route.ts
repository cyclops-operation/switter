import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import NaverProvider from "next-auth/providers/naver"

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(userDetail) {
      if (Object.keys(userDetail).length === 0) {
        return false
      }

      return true
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/waiting`
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }