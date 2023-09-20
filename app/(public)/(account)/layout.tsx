import Image from "next/image"

import accountImage from "@/public/images/account-image-example.jpg"

interface AccountLayoutProps {
  children: React.ReactNode
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <section className="mx-10 my-52 flex max-h-[700px] w-[1000px] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-700">
      <div className="h-fill flex w-full min-w-[500px] flex-1 flex-col gap-20 bg-zinc-50 px-14 py-20 dark:bg-zinc-900">
        {children}
      </div>

      <Image
        className="flex-2 w-full object-cover"
        src={accountImage.src}
        alt="account-image"
        width={500}
        height={700}
      />
    </section>
  )
}

export default AccountLayout
