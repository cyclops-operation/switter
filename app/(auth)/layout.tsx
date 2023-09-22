import { redirect } from "next/navigation"

import { accountStatus } from "@/interface/account"

import { pageRoute } from "@/lib/page-route"
import { SiteHeader } from "@/components/layout/site-header"

import { getSessionAccount } from "../api/account/action"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const account = await getSessionAccount()

  const isNotAuthorized =
    account === null || account?.status === accountStatus.Enum.PENDING

  if (isNotAuthorized) {
    redirect(pageRoute.SignIn)
  }

  return (
    <div className="relative flex h-full flex-col">
      <SiteHeader />

      <main>{children}</main>
    </div>
  )
}

export default AuthLayout
