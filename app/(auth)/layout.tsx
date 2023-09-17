import { SiteHeader } from "@/components/layout/site-header"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex h-full flex-col">
      <SiteHeader />

      <main>{children}</main>
    </div>
  )
}

export default AuthLayout
