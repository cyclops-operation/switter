import { redirect } from "next/navigation"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"
import { CardContent, CardFooter } from "@/components/ui/card"
import InfoTooltip from "@/components/common/info-tooltip"

import AccountHeader from "../src/ui/header"
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

      <CardContent className="flex-1">
        {/* @ts-expect-error Async Server Component */}
        <AccountPending />
      </CardContent>

      <CardFooter className="flex justify-center">
        <InfoTooltip
          triggerText="가입된 계정인데 다시 가입 신청을 하는 경우"
          tooltipText={`네이버 이메일을 변경한 경우 문제가 생길 수 있습니다.\n메일 변경을 위해 관리자에게 문의 부탁드립니다.`}
        />
      </CardFooter>
    </>
  )
}
