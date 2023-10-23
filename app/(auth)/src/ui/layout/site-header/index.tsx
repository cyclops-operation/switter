import MainMenu from "./main-menu"
import MobileMenuSheet from "./mobile-menu-sheet"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <MainMenu />

        <MobileMenuSheet />
      </div>
    </header>
  )
}
