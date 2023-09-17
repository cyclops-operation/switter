"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

interface TransitionProviderProps {
  children: ReactNode
}

export default function TransitionProvider({
  children,
}: TransitionProviderProps) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {children}
    </AnimatePresence>
  )
}
