import { compare } from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

import { pageRoute } from "@/lib/page-route"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "text",
        },
        password: {
          label: "패스워드",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("오류가 발생했습니다.")

        const { email, password } = credentials

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        })

        if (!user) throw new Error("존재하지 않는 아이디입니다.")

        const result = await compare(password, user.token)

        if (!result) throw new Error("패스워드가 일치하지 않습니다.")

        return user as any
      },
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
      const user = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
      })

      session.user = { ...session.user, ...user }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
