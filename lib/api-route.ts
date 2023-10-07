const apiRoute = {
  Root: "/api",
  Monster: "/api/monster",
  User: "/api/user",
  Feed: "/api/feed",
  FeedDetail: (id: string | null) => `${apiRoute.Feed}?feedId=${id}`,
  Comment: "/api/comment",
  Notification: "/api/notification",
  Sheet: "/api/sheet",
  Me: "/api/me",
} as const

export { apiRoute }
