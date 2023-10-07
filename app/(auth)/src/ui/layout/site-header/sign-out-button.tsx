"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function SignOutButton() {
  const clickSignOut = () => {
    signOut()
  }

  return (
    <Button variant="ghost" onClick={clickSignOut}>
      Logout
    </Button>
  )
}
