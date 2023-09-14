"use client"

import { useEffect } from "react"

import pusherJs from "pusher-js"

import { siteConfig } from "@/config/site"
import { pusherChannel, pusherEvent, pusherOptions } from "@/lib/pusher"
import { ThemeToggle } from "@/components/common/theme-toggle"

import { useToast } from "../ui/use-toast"
import { MainNav } from "./main-nav"

export function SiteHeader() {
  const { toast } = useToast()

  useEffect(() => {
    const pusher = new pusherJs(pusherOptions.key, {
      cluster: pusherOptions.cluster,
    })

    const channel = pusher.subscribe(pusherChannel.Auth)

    channel.bind(pusherEvent.SignIn, (data: any) => {
      toast({
        title: data.message,
        description: "Your message has been sent.",
      })
    })

    return () => {
      pusher.unsubscribe(pusherChannel.Auth)
    }
  }, [toast])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />

                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
