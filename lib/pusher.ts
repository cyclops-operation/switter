const pusherOptions = {
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET as string,
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

export { pusherChannel, pusherEvent, pusherOptions }
