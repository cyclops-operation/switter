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
  Admin: "/admin",
} as const

export { pageRoute }
