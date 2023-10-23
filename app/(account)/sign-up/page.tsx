import { pageRoute } from "@/lib/page-route"
import { CardContent, CardFooter } from "@/components/ui/card"

import AccountFooterLink from "../src/ui/footer-link"
import AccountHeader from "../src/ui/header"
import SignUpForm from "./src/ui/sign-up-form"

export default async function SignUp() {
  return (
    <>
      <AccountHeader
        title="회원가입"
        description="회원가입을 위해 필요한 내용들을 입력해주세요"
      />

      <CardContent>
        <SignUpForm />
      </CardContent>

      <CardFooter className="flex justify-center">
        <AccountFooterLink href={pageRoute.SignIn}>
          로그인으로 돌아가기
        </AccountFooterLink>
      </CardFooter>
    </>
  )
}
