const pageRoute = {
  // (public)
  Root: "/",
  Docs: "/docs",

  // (account)
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  Waiting: "/waiting",

  // (auth)
  Feed: "/feed",
  FeedDetail: (id: string | null) => `${pageRoute.Feed}?feedId=${id}`,
  Admin: "/admin",
} as const

export { pageRoute }
