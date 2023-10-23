"use client"

import { useRouter } from "next/navigation"

import { signOut } from "next-auth/react"

import { pageRoute } from "@/lib/page-route"

const OtherAccountButton = () => {
  const { push } = useRouter()

  const onClick = () => {
    signOut()
    push(pageRoute.SignIn)
  }

  return (
    <button
      className="text-sm text-zinc-600 hover:underline dark:text-zinc-300"
      onClick={onClick}
    >
      다른 계정으로 로그인하기
    </button>
  )
}

export default OtherAccountButton
