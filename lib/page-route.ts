const pageRouteBase = {
  // (public)
  Root: "/",
  Docs: "/docs",

  // (account)
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  Waiting: "/waiting",

  // (auth)
  Feed: "/feed",
  Admin: "/admin",
}

const pageRoutePath = {
  Admin: {
    Request: "request",
    Monster: "monster",
  },
}

const pageRoute = {
  // (public)
  Root: pageRouteBase.Root,
  Docs: pageRouteBase.Docs,

  // (account)
  SignIn: pageRouteBase.SignIn,
  SignUp: pageRouteBase.SignUp,
  Waiting: pageRouteBase.Waiting,

  // (auth)
  Feed: pageRouteBase.Feed,
  Admin: {
    Request: `${pageRouteBase.Admin}/${pageRoutePath.Admin.Request}`,
    Monster: `${pageRouteBase.Admin}/${pageRoutePath.Admin.Monster}`,
  },
} as const

export { pageRoute }
