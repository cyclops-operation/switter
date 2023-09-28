"use client"

import { useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { signOut } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/common/theme-toggle"

import { Button } from "../ui/button"
import { MainNav } from "./main-nav"
import SideAlarm from "./side-alarm"

export function SiteHeader() {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false)

  const clickSignOut = () => {
    signOut()
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button
            variant="ghost"
            onClick={() => setIsAlarmOpen((prev) => !prev)}
          >
            알림
          </Button>
          {/* 임시 로그아웃 */}
          <Button variant="ghost" onClick={clickSignOut}>
            로그아웃
          </Button>
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
      {isAlarmOpen ? (
        <AnimatePresence>
          <motion.div
            className="fixed right-3 top-20"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
          >
            <SideAlarm />
          </motion.div>
        </AnimatePresence>
      ) : null}
    </header>
  )
}
