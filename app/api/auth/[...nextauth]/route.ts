import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import NaverProvider from "next-auth/providers/naver"

import { pageRoute } from "@/lib/page-route"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: pageRoute.SignIn,
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
      return `${baseUrl}${pageRoute.Waiting}`
    },

    async session({ session }) {
      const sessionUser = await prisma.user.findFirst({
        where: {
          naverKey: session?.user?.email as string,
        },
      })

      if (!sessionUser) return session

      // 기존 세션 타입에 email이 있는데 필요없다면 아래의 개체를 이용해 삭제
      // Reflect.deleteProperty(session.user, "email")

      session.user = { ...session.user, ...sessionUser }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
