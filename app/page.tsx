"use client"

import axios from "axios"

import { Button } from "@/components/ui/button"

export default function IndexPage() {
  const fetchUser = async () => {
    axios
      .post("/api", {
        guildName: `길드-${new Date().getTime()}`,
        name: `유저-${new Date().getTime()}`,
      })
      .then((res) => res.data)
  }

  return (
    <section className="container flex h-full items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center justify-center gap-2">
        <span
          className="inline-block h-[45px] w-[52px] bg-[position:-63px_-199px] bg-no-repeat"
          style={{ backgroundImage: "url(./images/img_currency_sp.png)" }}
        />

        <h2 className="relative text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Increase Grow Your Power
        </h2>

        <p className="w-full text-center text-lg text-slate-700">coming soon</p>

        <Button onClick={fetchUser}>Create User</Button>
      </div>
    </section>
  )
}
