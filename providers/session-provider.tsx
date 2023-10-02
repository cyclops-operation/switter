"use client"

import { ReactNode } from "react"

import { SessionProvider } from "next-auth/react"

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
