const pageRoute = {
  // (public)
  Root: "/",
  Docs: "/docs",

  // (account)
  SignIn: "/sign-in",
  Waiting: "/waiting",

  // (auth)
  Feed: "/feed",
  FeedDetail: (id: string | null) => `${pageRoute.Feed}?feedId=${id}`,
  Admin: "/admin",
} as const

export { pageRoute }
