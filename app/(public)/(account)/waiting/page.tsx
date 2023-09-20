"use client"

import { useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

import { useQuery } from "@tanstack/react-query"

import { useToast } from "@/components/ui/use-toast"
import Loading from "@/components/common/loading"

import AccountHeader, { AccountHeaderProps } from "../src/ui/header"
import RequestForm from "./src/ui/form"
import AccountPending from "./src/ui/pending"

const Waiting = () => {
  const { push } = useRouter()
  const { toast } = useToast()

  const { data: account, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: async () => await fetch(`/api/account`).then((res) => res.json()),
  })

  const status = account?.status

  const isPending = status === "PENDING"
  const isActive = status === "ACTIVE"

  const accountHeaderProps: AccountHeaderProps = isPending
    ? {
        title: "가입 승인 대기중",
        description:
          "어드민이 가입 요청을 수락하면 정상적으로 서비스를 이용하실 수 있습니다.",
      }
    : {
        title: "가입 승인 요청",
        description: "회원가입 승인 요청을 위한 기본 입력 정보를 작성해주세요",
      }

  useLayoutEffect(() => {
    if (isActive) {
      push("/feed")
      toast({ title: "로그인 되었습니다!" })
    }
  }, [isActive, push, toast])

  if (isLoading) return <Loading />
  if (isActive) return <div>... 로그인 중</div>

  return (
    <>
      <AccountHeader {...accountHeaderProps} />
      {isPending ? <AccountPending /> : <RequestForm />}
    </>
  )
}

export default Waiting
