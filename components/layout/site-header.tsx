"use client"

import { useEffect } from "react"

import { signOut } from "next-auth/react"
import pusherJs from "pusher-js"

import { siteConfig } from "@/config/site"
import { pusherChannel, pusherEvent, pusherOptions } from "@/lib/pusher"
import { ThemeToggle } from "@/components/common/theme-toggle"

import { Button } from "../ui/button"
import { ToastAction } from "../ui/toast"
import { useToast } from "../ui/use-toast"
import { MainNav } from "./main-nav"

export function SiteHeader() {
  const { toast } = useToast()

  const clickSignOut = () => {
    signOut()
  }

  useEffect(() => {
    const pusher = new pusherJs(pusherOptions.key, {
      cluster: pusherOptions.cluster,
    })

    const channel = pusher.subscribe(pusherChannel.Auth)

    channel.bind(pusherEvent.SignIn, (data: any) => {
      toast({
        title: `${data.message} 유저가 가입을 신청했습니다.`,
        description: "유저 권한을 확인해주세요.",
        action: <ToastAction altText="유저리스트">유저리스트 확인</ToastAction>,
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
          {/* 임시 로그아웃 */}
          <Button variant="ghost" onClick={clickSignOut}>
            로그아웃
          </Button>
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
