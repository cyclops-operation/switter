"use client"

import { useQuery } from "@tanstack/react-query"
import { getProviders, signIn } from "next-auth/react"

import { Button } from "../ui/button"
import Loading from "./loading"

type Platform = {
  text: string
  style: string
}

const platformInfo: Record<string, Platform> = {
  naver: {
    text: "네이버 로그인",
    style: "",
  },
}

const SocialLogin = () => {
  const { data: providers } = useQuery(["providers"], getProviders)

  const isLoading = providers === undefined
  const isProviderEmpty = providers === null

  if (isLoading) return <Loading height="fit" />
  if (isProviderEmpty) return <div>소셜 불러오기에 문제가 생겼습니다.</div>

  return (
    <div>
      {Object.values(providers).map(({ id: provider }) => {
        const { text, style } = platformInfo[provider]
        return (
          <Button
            key={provider}
            className={`w-full ${style} bg-[#03C75A] font-bold text-white hover:bg-[#03B75A]`}
            onClick={() => signIn(provider)}
          >
            {text}
          </Button>
        )
      })}
    </div>
  )
}

export default SocialLogin
