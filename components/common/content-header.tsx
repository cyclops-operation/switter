import { forwardRef } from "react"

import { cn } from "@/lib/utils"

const ContentHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-3 pb-10 pt-8", className)}
    {...props}
  />
))

ContentHeader.displayName = "ContentHeader"

const ContentTitle = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-3xl font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-50",
      className
    )}
    {...props}
  />
))

ContentTitle.displayName = "ContentTitle"

const ContentSubtitle = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg leading-none tracking-tight text-zinc-600 dark:text-zinc-400",
      className
    )}
    {...props}
  />
))

ContentSubtitle.displayName = "ContentSubtitle"

export { ContentHeader, ContentSubtitle, ContentTitle }
