"use server"

import { pusherChannel, pusherEvent, pusherOptions } from "@/lib/pusher"

export async function pusherSend(formData: FormData) {
  "use server"

  const Pusher = require("pusher")

  const username = formData.get("username")

  const pusher = new Pusher(pusherOptions)

  await pusher.trigger(pusherChannel.Auth, pusherEvent.SignIn, {
    message: `${JSON.stringify(username)}\n\n`,
  })
}
