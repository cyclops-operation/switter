"use client"

import { signOut } from "next-auth/react"

import { Button, ButtonProps } from "@/components/ui/button"

export default function SignOutButton(props: ButtonProps) {
  const clickSignOut = () => {
    signOut()
  }

  return (
    <Button variant="ghost" {...props} onClick={clickSignOut}>
      로그아웃
    </Button>
  )
}
