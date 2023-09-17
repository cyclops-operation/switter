import "@/styles/globals.css"
import "@/styles/monster.css"
import { Metadata } from "next"

import TanstackProviders from "@/providers/query-provider"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/common/tailwind-indicator"
import { SiteHeader } from "@/components/layout/site-header"
import { ThemeProvider } from "@/theme/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="ko" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "h-full bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <TanstackProviders>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex h-full flex-col">
                <SiteHeader />

                <section className="h-[calc(100%-64px)]">{children}</section>
              </div>

              {/* 디바이스 사이즈 체크 (화면 좌측하단) */}
              <TailwindIndicator />

              {/* Toast Container */}
              <Toaster />
            </ThemeProvider>
          </TanstackProviders>
        </body>
      </html>
    </>
  )
}
