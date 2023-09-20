import { CardContent, CardFooter } from "@/components/ui/card"
import InfoTooltip from "@/components/common/info-tooltip"
import SocialLogin from "@/components/common/social-login"

import AccountHeader from "../src/ui/header"

const SignIn = () => {
  return (
    <>
      <AccountHeader
        title="반갑습니다!"
        description="로그인 할 소셜 플랫폼을 선택해주세요!"
      />
      <CardContent>
        <SocialLogin />
      </CardContent>
      <CardFooter className="flex justify-center">
        <InfoTooltip
          triggerText="소셜 로그인 안내"
          tooltipText="현재 네이버만을 지원하고 있으며, 추후 요청에 의해 추가될 예정입니다."
        />
      </CardFooter>
    </>
  )
}

export default SignIn
