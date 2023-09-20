import Image from "next/image"

import accountImage from "/public/images/account-image-example.jpg"

interface AccountLayoutProps {
  children: React.ReactNode
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <section className="mx-10 my-52 flex h-[700px] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-700">
      <div className="flex w-[600px] flex-col gap-20 bg-zinc-50 px-14 py-20 dark:bg-zinc-900">
        {children}
      </div>

      <Image
        className="object-cover"
        src={accountImage.src}
        alt="account-image"
        width={400}
        height={700}
      />
    </section>
  )
}

export default AccountLayout
