"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "../ui/switch"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <Switch
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </>
  )
}
