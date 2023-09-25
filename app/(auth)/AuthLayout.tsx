import { redirect } from "next/navigation"

import { accountStatus } from "@/interface/account"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"
import { SiteHeader } from "@/components/layout/site-header"

import { AuthLayoutProps } from "./layout"

export const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await getServerAccount()

  const isNotAuthorized =
    session === null || session?.user.status === accountStatus.Enum.PENDING

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
