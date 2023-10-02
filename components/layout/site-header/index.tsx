import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/common/theme-toggle"

import { MainNav } from "../main-nav"
import SideAlarm from "./side-alarm"
import SignOutButton from "./sign-out-button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <SideAlarm />

          <SignOutButton />

          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
