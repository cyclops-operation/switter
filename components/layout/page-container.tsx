import { HTMLAttributes, ReactNode } from "react"
import { usePathname } from "next/navigation"

import { Variants, motion } from "framer-motion"

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  as?: string
}

const variants: Variants = {
  in: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    x: -40,
    transition: {
      duration: 0.3,
    },
  },
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  const pathName = usePathname()

  return (
    <motion.div
      key={pathName}
      variants={variants}
      animate="in"
      initial="out"
      exit="out"
      className={className}
    >
      {children}
    </motion.div>
  )
}
