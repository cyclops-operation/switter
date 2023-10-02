import { redirect } from "next/navigation"

import { accountStatus } from "@/interface/account"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"
import RootPusher from "@/app/(auth)/src/ui/layout/root-pusher"
import { SiteHeader } from "@/app/(auth)/src/ui/layout/site-header"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const account = await getServerAccount()

  const isAuthorized = account?.user.status === accountStatus.Enum.ACTIVE

  if (!isAuthorized) {
    redirect(pageRoute.Waiting)
  }

  return (
    <div className="relative flex h-full flex-col">
      <RootPusher role={account.user.role} />

      <SiteHeader />

      <main className="h-full">{children}</main>
    </div>
  )
}
