interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <main className="flex-co relative flex h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      {children}
    </main>
  )
}

export default PublicLayout
