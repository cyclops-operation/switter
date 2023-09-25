import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { accountRole } from "@/interface/account"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerAccount()

  if (session?.user.role !== accountRole.Enum.ADMIN) {
    redirect(pageRoute.Feed)
  }

  return <section>{children}</section>
}
