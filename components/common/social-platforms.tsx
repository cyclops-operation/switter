"use client"

import { useQuery } from "@tanstack/react-query"
import { getProviders, signIn } from "next-auth/react"

import { Button } from "../ui/button"
import Loading from "./loading"

const platformInfo: Record<string, string> = {
  naver: "네이버",
}

const SocialPlatforms = () => {
  const { data: providers } = useQuery(["providers"], getProviders)

  const isLoading = providers === undefined
  const isProviderEmpty = providers === null

  if (isLoading) return <Loading />
  if (isProviderEmpty) return <div>소셜 불러오기에 문제가 생겼습니다.</div>

  return (
    <div>
      {Object.values(providers).map(({ id: provider }) => {
        return (
          <Button
            key={provider}
            className="w-full"
            onClick={() => signIn(provider)}
          >
            {platformInfo[provider]}
          </Button>
        )
      })}
    </div>
  )
}

export default SocialPlatforms
