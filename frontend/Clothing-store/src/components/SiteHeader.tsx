import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BagIcon, SearchIcon, UserIcon } from './icons'

const navItems = [
  { label: 'New In', href: '/new-in' },
  { label: 'Women', href: '/women' },
  { label: 'Men', href: '/men' },
  { label: 'Sale', href: '/sale' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="divider sticky top-0 z-10 border-b bg-[var(--color-paper)]">
      <div className="container-page flex items-center justify-between py-5">
        <Link to="/" className="text-lg tracking-[0.2em] uppercase">
          Clothing Store
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} className="nav-link" to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {searchOpen && (
            <input
              type="search"
              className="input w-32 sm:w-48"
              placeholder="Search"
              autoFocus
            />
          )}
          <button
            type="button"
            className="icon-btn"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
          >
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
            <Link
              key={item.label}
              className="nav-link border-b-0 px-4 py-3"
              to={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
