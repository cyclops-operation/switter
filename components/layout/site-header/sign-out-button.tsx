"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

const SignOutButton = () => {
  const clickSignOut = () => {
    signOut()
  }

  return (
    <Button variant="ghost" onClick={clickSignOut}>
      로그아웃
    </Button>
  )
}

export default SignOutButton
