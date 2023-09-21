const pageRoute = {
  // (public)
  Root: "/",
  Docs: "/docs",

  // (account)
  SignIn: "/sign-in",
  Waiting: "/waiting",

  // (auth)
  Feed: "/feed",
} as const

export { pageRoute }
