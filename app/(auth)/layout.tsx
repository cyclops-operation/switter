import { redirect } from "next/navigation"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"
import RootPusher from "@/components/layout/root-pusher"
import { SiteHeader } from "@/components/layout/site-header"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerAccount()

  const isAuthorized = session?.user.status !== accountStatus.Enum.PENDING

  if (!isAuthorized) {
    redirect(pageRoute.SignIn)
  }

  return (
    <div className="relative flex h-full flex-col">
      <RootPusher role={account.user.role} />
      <SiteHeader />

      <main>{children}</main>
    </div>
  )
}

export default AuthLayout
