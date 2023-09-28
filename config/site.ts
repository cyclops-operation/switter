import { pageRoute } from "@/lib/page-route"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Switter",
  description: "Increase grow your power",

  mainNav: [
    {
      title: "Feed",
      href: pageRoute.Feed,
    },
    { title: "Admin (임시)", href: pageRoute.Admin },
  ],

  links: {
    github: "https://github.com/cyclops-operation/switter",
  },
}
