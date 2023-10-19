import { HTMLAttributes } from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center rounded-md text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground select-none",
  {
    variants: {
      selected: {
        true: "",
        false: "",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-7 px-2 rounded-md",
        lg: "h-9 px-4 rounded-md",
      },
      clickable: {
        true: "cursor-pointer hover:bg-primary/90",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      size: "default",
    },
  }
)

export type TagProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tagVariants>

const Tag = ({
  selected,
  size,
  className,
  children,
  onClick,
  ...rest
}: TagProps) => {
  return (
    <div
      className={cn(
        tagVariants({ selected, size, clickable: !!onClick, className })
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Tag
