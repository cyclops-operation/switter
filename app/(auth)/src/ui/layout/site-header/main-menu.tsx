import { ThemeToggle } from "@/components/common/theme-toggle"

import MainNav from "../main-nav"
import SignOutButton from "./sign-out-button"

export default function MainMenu() {
  return (
    <>
      <MainNav />

      <div className="flex flex-1 items-center justify-end max-sm:hidden">
        <ThemeToggle />

        <SignOutButton />
      </div>
    </>
  )
}
