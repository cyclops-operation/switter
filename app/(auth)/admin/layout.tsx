import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { userRole } from "@/interface/user"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerAccount()

  const isAdmin = session?.user.role === userRole.Enum.ADMIN

  if (!isAdmin) {
    redirect(pageRoute.Feed)
  }

  return <section className="container">{children}</section>
}
