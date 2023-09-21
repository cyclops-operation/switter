import Image from "next/image"
import { redirect } from "next/navigation"

import { accountStatus } from "@/interface/account"

import { pageRoute } from "@/lib/page-route"
import { Card } from "@/components/ui/card"

import { getSessionAccount } from "../api/account/action"
import accountImage from "/public/images/account-image-example.jpg"

interface AccountLayoutProps {
  children: React.ReactNode
}

const AccountLayout = async ({ children }: AccountLayoutProps) => {
  const account = await getSessionAccount()

  const isActive = account?.status === accountStatus.Enum.ACTIVE

  if (isActive) {
    redirect(pageRoute.Feed)
  }

  return (
    <main className="flex-co relative flex h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <Card className="mx-10 my-52 flex h-[400px] overflow-hidden">
        <div className="flex w-[400px] flex-col justify-between">
          {children}
        </div>

        <Image
          className="object-cover"
          src={accountImage.src}
          alt="account-image"
          width={300}
          height={350}
        />
      </Card>
    </main>
  )
}

export default AccountLayout
