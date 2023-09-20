import SocialPlatforms from "@/components/common/social-platforms"

import AccountHeader from "../src/ui/header"

const SignIn = () => {
  return (
    <>
      <AccountHeader
        title="반갑습니다!"
        description="로그인 할 소셜 플랫폼을 선택해주세요!"
      />
      <SocialPlatforms />
    </>
  )
}

export default SignIn
