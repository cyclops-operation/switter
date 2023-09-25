"use client"

import { useState } from "react"

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
      {isAlarmOpen ? <SideAlarm /> : null}
    </header>
  )
}
