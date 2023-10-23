import Image from "next/image"
import { redirect } from "next/navigation"

import { userStatus } from "@/interface/user"

import { pageRoute } from "@/lib/page-route"
import { cn, getServerAccount } from "@/lib/utils"
import { Card } from "@/components/ui/card"

import accountImage from "/public/images/account-image.jpg"

interface AccountLayoutProps {
  children: React.ReactNode
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const session = await getServerAccount()

  const isActive = session?.user.status === userStatus.Enum.ACTIVE

  if (isActive) {
    redirect(pageRoute.Feed)
  }

  return (
    <main className="flex h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <Card
        className={cn(
          "mx-10 my-52 flex h-[598px] overflow-hidden",
          "max-mobile:m-0 max-mobile:h-full max-mobile:border-none max-mobile:px-3 max-mobile:py-6", // 레이아웃 관련
          "max-mobile:bg-[url('/images/account-image.jpg')] max-mobile:bg-cover max-mobile:bg-blend-soft-light" // 백그라운드 이미지 관련
        )}
      >
        <div className="flex w-[400px] flex-col justify-between">
          {children}
        </div>

        <Image
          className="object-cover grayscale max-mobile:hidden"
          src={accountImage.src}
          alt="account-image"
          width={400}
          height={350}
        />
      </Card>
    </main>
  )
}
