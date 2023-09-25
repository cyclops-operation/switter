import { redirect } from "next/navigation"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"
import RootPusher from "@/components/layout/root-pusher"
import { SiteHeader } from "@/components/layout/site-header"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const account = await getServerAccount()

  const isAuthorized = !!account

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
