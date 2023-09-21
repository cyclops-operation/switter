"use client"

import { useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

import { accountStatus } from "@/interface/account"
import { useQuery } from "@tanstack/react-query"

import { apiRoute } from "@/lib/api-route"
import { pageRoute } from "@/lib/page-route"
import { CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import InfoTooltip from "@/components/common/info-tooltip"
import Loading from "@/components/common/loading"

import AccountHeader, { AccountHeaderProps } from "../src/ui/header"
import CreateRequestForm from "./src/ui/form/create"
import AccountPending from "./src/ui/pending"

const Waiting = () => {
  const { push } = useRouter()
  const { toast } = useToast()

  const { data: account, isLoading } = useQuery({
    queryKey: [apiRoute.Account],
    queryFn: async () =>
      await fetch(apiRoute.Account).then((res) => res.json()),
  })

  const status = account?.status

  const isPending = status === accountStatus.Enum.PENDING
  const isActive = status === accountStatus.Enum.ACTIVE

  const accountHeaderProps: AccountHeaderProps = isPending
    ? {
        title: "가입 승인 대기중",
        description: `길드 관리자가 가입 요청을 수락하면, 정상적으로 서비스를 이용하실 수 있습니다.`,
      }
    : {
        title: "가입 승인 요청",
        description: "회원가입 승인 요청을 위한 기본 입력 정보를 작성해주세요",
      }

  useLayoutEffect(() => {
    if (isActive) {
      push(pageRoute.Feed)
      toast({ title: "로그인 되었습니다!" })
    }
  }, [isActive, push, toast])

  if (isLoading || isActive) return <Loading />

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
