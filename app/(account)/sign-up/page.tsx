import { CardContent } from "@/components/ui/card"

import AccountHeader from "../src/ui/header"
import SignUpForm from "./src/ui/sign-up-form"

const SignUp = () => {
  return (
    <>
      <AccountHeader
        title="회원가입"
        description="회원가입을 위해 필요한 내용들을 입력해주세요"
      />
      <CardContent>
        <SignUpForm />
      </CardContent>
    </>
  )
}

export default SignUp
