const apiRoute = {
  Root: "/api",
  Monster: "/api/monster",
  Account: "/api/account",
  User: "/api/user",
  Feed: "/api/feed",
  FeedDetail: (id: string | null) => `${apiRoute.Feed}?feedId=${id}`,
  Comment: "/api/comment",
  Notification: "/api/notification",
  Sheet: "/api/sheet",
} as const

export { apiRoute }
