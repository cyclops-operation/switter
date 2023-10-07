import Link from "next/link"

import { pageRoute } from "@/lib/page-route"
import { CardContent, CardFooter } from "@/components/ui/card"

import AccountHeader from "../src/ui/header"
import SignInForm from "./src/ui/sign-in-form"

export default async function SignIn() {
  return (
    <>
      <AccountHeader
        title="반갑습니다!"
        description="서비스를 이용하기 위해 로그인을 진행해주세요"
      />

      <CardContent className="flex-1">
        <SignInForm />
      </CardContent>

      <CardFooter className="flex justify-center">
        <Link
          className="text-sm text-zinc-600 hover:underline dark:text-zinc-300"
          href={pageRoute.SignUp}
        >
          회원가입
        </Link>
      </CardFooter>
    </>
  )
}
