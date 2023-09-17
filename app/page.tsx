"use client"

import Link from "next/link"

import PageContainer from "@/components/layout/page-container"

export default function IndexPage() {
  return (
    <PageContainer className="container flex h-[calc(100vh-65px)] items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center justify-center gap-2">
        <span
          className="inline-block h-[45px] w-[52px] bg-[position:-63px_-199px] bg-no-repeat"
          style={{ backgroundImage: "url(./images/img_currency_sp.png)" }}
        />

        <h2 className="relative text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Increase grow your Power
        </h2>

        <Link href="/feed">Go Main</Link>
      </div>
    </PageContainer>
  )
}
