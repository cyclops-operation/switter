"use client"

import { MouseEvent } from "react"

import { AxiosError } from "axios"
import { ErrorBoundary } from "react-error-boundary"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import FeedSearch from "../src/ui/search/feed-search"
import CommentSheet from "../src/ui/sheet/comment-sheet"
import FeedTabs from "../src/ui/tabs/FeedTabs"

function FallbackCompnent({
  error,
  resetErrorBoundary,
}: {
  error: AxiosError
  resetErrorBoundary: () => void
}) {
  const handleErrorReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    resetErrorBoundary()
  }

  return (
    <AlertDialog open={Boolean(error)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{error.response?.data as string}</AlertDialogTitle>

          <AlertDialogDescription>다시 시도해주세요.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={handleErrorReset}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function FeedPage() {
  return (
    <section className="container h-full">
      <FeedSearch />

      <ErrorBoundary FallbackComponent={FallbackCompnent}>
        <FeedTabs />

        <CommentSheet />
      </ErrorBoundary>
    </section>
  )
}
