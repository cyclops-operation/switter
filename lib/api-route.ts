const apiRoute = {
  Root: "/api",
  Pusher: "/api/pusher",
  Monster: "/api/monster",
  Account: "/api/account",
  User: "/api/user",
  Feed: "/api/feed",
  FeedDetail: (id: string | null) => `${apiRoute.Feed}?feedId=${id}`,
  Comment: "/api/comment",
  Alarm: "/api/alarm",
  AlarmAdmin: "/api/alarm/admin",
} as const

export { apiRoute }
