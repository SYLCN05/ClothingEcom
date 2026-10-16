import type { CartLine } from '../types/cart'

const GUEST_CART_KEY = 'guestCart'

export function readGuestCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeGuestCart(lines: CartLine[]): void {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(lines))
  } catch {
    // ignore (private browsing, storage full, etc.)
  }
}

export function clearGuestCart(): void {
  try {
    localStorage.removeItem(GUEST_CART_KEY)
  } catch {
    // ignore
  }
}
