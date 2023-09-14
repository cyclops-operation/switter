const pusherOptions = {
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_CLUSTER as string,
  useTLS: true,
} as const

const pusherChannel = {
  Auth: "auth",
  Feed: "feed",
} as const

const pusherEvent = {
  SignIn: "signIn",
  Otp: "otp",
  FeedCreate: "feedCreate",
} as const

export { pusherOptions, pusherChannel, pusherEvent }
