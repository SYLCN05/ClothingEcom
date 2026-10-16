import { createContext } from 'react'
import type { CartLine } from '../types/cart'
import type { Product } from '../types/product'

export type CartContextValue = {
  items: CartLine[]
  isOpen: boolean
  itemCount: number
  openDrawer: () => void
  closeDrawer: () => void
  addItem: (product: Product, size: string, quantity?: number) => Promise<void>
  updateQuantity: (line: CartLine, quantity: number) => Promise<void>
  removeItem: (line: CartLine) => Promise<void>
  mergeGuestCart: () => Promise<void>
  resetToGuest: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
