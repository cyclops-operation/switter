import { redirect } from "next/navigation"

import { accountStatus } from "@/interface/account"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"
import { CardContent, CardFooter } from "@/components/ui/card"
import InfoTooltip from "@/components/common/info-tooltip"

import AccountHeader, { AccountHeaderProps } from "../src/ui/header"
import CreateRequestForm from "./src/ui/form/create"
import AccountPending from "./src/ui/pending"

const Waiting = async () => {
  const session = await getServerAccount()

  const hasNotSession = session === null

  if (hasNotSession) {
    redirect(pageRoute.SignIn)
  }

  const isPending = session?.user.status === accountStatus.Enum.PENDING

  const accountHeaderProps: AccountHeaderProps = isPending
    ? {
        title: "가입 승인 대기중",
        description: `길드 관리자가 가입 요청을 수락하면, 정상적으로 서비스를 이용하실 수 있습니다.`,
      }
    : {
        title: "가입 승인 요청",
        description: "회원가입 승인 요청을 위한 기본 입력 정보를 작성해주세요",
      }

  return (
    <>
      <AccountHeader {...accountHeaderProps} />
      <CardContent>
        {isPending ? <AccountPending /> : <CreateRequestForm />}
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

export default Waiting
