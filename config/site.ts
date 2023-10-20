import { userRole } from "@/interface/user"

import { pageRoute } from "@/lib/page-route"

interface SiteConfigRoute {
  title: string
  href: string
  description?: string
  routes?: SiteConfigRoute[]
  role?: string
}

type SiteConfig = typeof siteConfig & {
  mainNav: SiteConfigRoute[]
}

const siteConfig = {
  name: "Switter",
  description: "Increase grow your power",

  mainNav: [
    {
      title: "Feed",
      href: pageRoute.Feed,
    },
    {
      title: "Admin",
      href: pageRoute.Admin.Request,
      routes: [
        {
          title: "Request",
          description: "회원가입 요청을 처리할 수 있습니다.",
          href: pageRoute.Admin.Request,
        },
        {
          title: "Monster",
          description: "덱에 추가될 몬스터를 관리할 수 있습니다.",
          href: pageRoute.Admin.Monster,
        },
      ],
      role: userRole.Enum.ADMIN,
    },
  ],

  links: {
    github: "https://github.com/cyclops-operation/switter",
  },
}

export { siteConfig, type SiteConfig, type SiteConfigRoute }
