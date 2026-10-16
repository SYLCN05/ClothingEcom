import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'
import { UserIcon } from './icons'

export function AccountMenu() {
  const auth = useAuth()
  const cart = useCart()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  async function handleLogout() {
    await auth.logout()
    cart.resetToGuest()
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="icon-btn"
        aria-label="Account"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <UserIcon />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 flex w-48 flex-col gap-3 border border-[var(--color-border)] bg-[var(--color-paper)] p-4">
          <span className="label-muted">Hi, {auth.user?.firstName}</span>
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
