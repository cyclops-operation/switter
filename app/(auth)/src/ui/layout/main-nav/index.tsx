import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getServerAccount } from "@/lib/utils"
import { Icons } from "@/components/common/icons"

import RouteMenu from "./route-menu"

export default async function MainNav() {
  const account = await getServerAccount()

  return (
    <div className="flex gap-6 md:gap-10">
      <h1 className="flex items-center">
        <Link href="/" className="flex items-center space-x-1">
          <Icons.batteryCharging className="h-6 w-6 text-foreground" />

          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
      </h1>

      <RouteMenu sessionRole={account?.user.role} />
    </div>
  )
}
