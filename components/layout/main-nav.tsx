import Link from "next/link"

import { NavItem } from "@/interface/nav"

import { siteConfig } from "@/config/site"
import { cn, getServerAccount } from "@/lib/utils"
import { Icons } from "@/components/common/icons"

interface MainNavProps {
  items?: NavItem[]
}

export async function MainNav({ items }: MainNavProps) {
  const account = await getServerAccount()

  return (
    <div className="flex gap-6 md:gap-10">
      <h1>
        <Link href="/" className="flex items-center space-x-1">
          <Icons.batteryCharging className="h-6 w-6 text-foreground" />

          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
      </h1>

      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(({ href, disabled, title, role }, index) => {
            const isCorrespondedRole = !role || role === account?.user.role
            return (
              isCorrespondedRole &&
              href && (
                <Link
                  key={index}
                  href={href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {title}
                </Link>
              )
            )
          })}
        </nav>
      ) : null}
    </div>
  )
}
