import { redirect } from "next/navigation"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"
import { CardContent, CardFooter } from "@/components/ui/card"

import AccountHeader from "../src/ui/header"
import OtherAccountButton from "./src/ui/other-account-button"
import AccountPending from "./src/ui/pending"

export default async function Waiting() {
  const session = await getServerAccount()

  const hasSession = session !== null

  if (!hasSession) {
    redirect(pageRoute.SignIn)
  }

  return (
    <>
      <AccountHeader
        title="가입 승인 대기중"
        description="길드 관리자가 가입 요청을 수락하면, 정상적으로 서비스를 이용하실 수 있습니다."
      />

      <CardContent>
        {/* @ts-expect-error Async Server Component */}
        <AccountPending />
      </CardContent>

      <CardFooter className="flex justify-center">
        <OtherAccountButton />
      </CardFooter>
    </>
  )
}
