interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <main className="flex-co relative flex h-screen items-center justify-center">
      {children}
    </main>
  )
}

export default PublicLayout
