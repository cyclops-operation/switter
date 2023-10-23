import { pageRoute } from "@/lib/page-route"
import { CardContent, CardFooter } from "@/components/ui/card"

import AccountFooterLink from "../src/ui/footer-link"
import AccountHeader from "../src/ui/header"
import SignInForm from "./src/ui/sign-in-form"

export default async function SignIn() {
  return (
    <>
      <AccountHeader
        title="반갑습니다!"
        description="서비스를 이용하기 위해 로그인을 진행해주세요"
      />

      <CardContent>
        <SignInForm />
      </CardContent>

      <CardFooter className="flex justify-center">
        <AccountFooterLink href={pageRoute.SignUp}>회원가입</AccountFooterLink>
      </CardFooter>
    </>
  )
}
