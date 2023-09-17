"use client"

import PageContainer from "@/components/layout/page-container"
import { SiteHeader } from "@/components/layout/site-header"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <PageContainer className="relative flex h-full flex-col">
      <SiteHeader />

      <main>{children}</main>
    </PageContainer>
  )
}
