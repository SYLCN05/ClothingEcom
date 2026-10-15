import { useState } from 'react'
import { BagIcon, SearchIcon, UserIcon } from './icons'

const navItems = ['New In', 'Women', 'Men', 'Sale']

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="divider sticky top-0 z-10 border-b bg-[var(--color-paper)]">
      <div className="container-page flex items-center justify-between py-5">
        <a href="#" className="text-lg tracking-[0.2em] uppercase">
          Clothing Store
        </a>

        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item} className="nav-link" href="#">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" className="icon-btn" aria-label="Search">
            <SearchIcon />
          </button>
          <button type="button" className="icon-btn" aria-label="Account">
            <UserIcon />
          </button>
          <button type="button" className="icon-btn" aria-label="Bag">
            <BagIcon />
          </button>
          <button
            type="button"
            className="label-muted md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="divider flex flex-col border-t md:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              className="nav-link border-b-0 px-4 py-3"
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
