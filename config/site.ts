export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Switter",
  description: "Increase grow your power",

  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Feed",
      href: "/feed",
    },
    { title: "Docs", href: "/docs" },
  ],

  links: {
    github: "https://github.com/cyclops-operation/switter",
  },
}
