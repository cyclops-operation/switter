import Image from "next/image"
import { redirect } from "next/navigation"

import { userStatus } from "@/interface/user"

import { pageRoute } from "@/lib/page-route"
import { getServerAccount } from "@/lib/utils"
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
    <main className="flex-co relative flex h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <Card className="mx-10 my-52 flex h-[598px] overflow-hidden">
        <div className="flex w-[400px] flex-col">{children}</div>

        <Image
          className="object-cover grayscale"
          src={accountImage.src}
          alt="account-image"
          width={400}
          height={350}
        />
      </Card>
    </main>
  )
}
