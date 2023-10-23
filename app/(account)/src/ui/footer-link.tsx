import { ReactNode } from "react"
import Link, { LinkProps } from "next/link"

interface AccountFooterLinkProps extends LinkProps {
  children: ReactNode
}

const AccountFooterLink = ({ children, ...rest }: AccountFooterLinkProps) => {
  return (
    <Link
      className="text-sm text-zinc-600 hover:underline dark:text-zinc-300"
      {...rest}
    >
      {children}
    </Link>
  )
}

export default AccountFooterLink
