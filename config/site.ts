import { pageRoute } from "@/lib/page-route"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Switter",
  description: "Increase grow your power",

  mainNav: [
    {
      title: "Home",
      href: pageRoute.Root,
    },
    {
      title: "Feed",
      href: pageRoute.Feed,
    },
    { title: "Docs", href: pageRoute.Docs },
  ],

  links: {
    github: "https://github.com/cyclops-operation/switter",
  },
}
