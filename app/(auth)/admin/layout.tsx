import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { accountRole } from "@/interface/account"

import { pageRoute } from "@/lib/page-route"
import { getSessionAccount } from "@/app/api/account/action"

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getSessionAccount()

  if (session?.role !== accountRole.Enum.ADMIN) {
    redirect(pageRoute.Feed)
  }

  return <section>{children}</section>
}
