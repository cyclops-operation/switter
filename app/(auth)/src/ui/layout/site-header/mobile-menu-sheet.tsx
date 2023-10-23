"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { userRole } from "@/interface/user"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/common/icons"
import { ThemeToggle } from "@/components/common/theme-toggle"

import SignOutButton from "./sign-out-button"

export default function MobileMenuSheet() {
  const { data: session } = useSession()

  const { push: routerPush } = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const isAdmin = session?.user.role === userRole.enum.ADMIN

  const handleRoute = (path: string) => {
    routerPush(path)

    setIsOpen(false)
  }

  return (
    <div className="hidden max-sm:block">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <Icons.menu className="h-5 w-5" />

            <span className="sr-only">메뉴</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex max-w-[400px] flex-col justify-between max-sm:w-full"
        >
          <ul className="flex flex-col">
            {siteConfig.mainNav.map(
              ({ title, href: routePath, routes, role: routeRole }) => {
                const hasSubRoute = Boolean(routes)

                if (routeRole === "ADMIN" && !isAdmin) {
                  return null
                }

                if (hasSubRoute) {
                  return (
                    <li key={routePath}>
                      {routes?.map(({ title, href, description }) => (
                        <div className="flex flex-col items-start pt-2">
                          <Button
                            key={href}
                            type="button"
                            variant="link"
                            className="w-auto font-semibold"
                            onClick={() => handleRoute(routePath)}
                          >
                            {title}
                          </Button>

                          <span className="px-4 text-xs text-gray-400">
                            {description}
                          </span>
                        </div>
                      ))}
                    </li>
                  )
                }

                return (
                  <li key={routePath} className="flex flex-col items-start">
                    <Button
                      type="button"
                      variant="link"
                      className="w-auto font-semibold"
                      onClick={() => handleRoute(routePath)}
                    >
                      {title}
                    </Button>
                  </li>
                )
              }
            )}
          </ul>

          <ul className="flex flex-col gap-2">
            <li className="flex flex-col px-4">
              <ThemeToggle />
            </li>

            <li className="px-4">
              <SignOutButton className="w-full" variant="outline" />
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}
