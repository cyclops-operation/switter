"use client"

import Link from "next/link"

import { SiteConfigRoute, siteConfig } from "@/config/site"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface RouteMenuProps {
  sessionRole?: string
}

const Route = ({ title, description, href }: SiteConfigRoute) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
)

const RouteMenu = ({ sessionRole }: RouteMenuProps) => {
  return (
    <NavigationMenu className="max-sm:hidden">
      <NavigationMenuList>
        {siteConfig.mainNav.map(({ href, title, role, routes }) => {
          const isCorrespondedRole = !role || role === sessionRole
          return (
            <NavigationMenuItem key={href}>
              {routes ? (
                <>
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {routes.map((props) => (
                        <Route key={props.href} {...props} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {title}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default RouteMenu
