import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from './useAuth'
import { CartContext } from './cartContextDefinition'
import * as cartApi from '../lib/cart'
import { clearGuestCart, readGuestCart, writeGuestCart } from '../lib/guestCart'
import type { CartLine } from '../types/cart'
import type { Product } from '../types/product'

function mergeLocalLine(lines: CartLine[], line: CartLine): CartLine[] {
  const index = lines.findIndex((l) => l.productId === line.productId && l.size === line.size)
  if (index === -1) return [...lines, line]
  const next = [...lines]
  next[index] = { ...next[index], quantity: next[index].quantity + line.quantity }
  return next
}

export function CartProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const [items, setItems] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (auth.status === 'loading' || initializedRef.current) return
    initializedRef.current = true

    const load = auth.status === 'authenticated' ? cartApi.getCart() : Promise.resolve(readGuestCart())
    load.then(setItems).catch(() => setItems([]))
  }, [auth.status])

  const itemCount = items.reduce((sum, line) => sum + line.quantity, 0)

  async function addItem(product: Product, size: string, quantity = 1) {
    if (auth.status === 'authenticated') {
      const result = await cartApi.addCartItem(product.id, size, quantity)
      setItems(result)
    } else {
      setItems((prev) => {
        const next = mergeLocalLine(prev, {
          productId: product.id,
          name: product.name,
          price: product.price,
          salePrice: product.salePrice,
          imageUrl: product.imageUrl,
          size,
          quantity,
        })
        writeGuestCart(next)
        return next
      })
    }
    setIsOpen(true)
  }

  async function updateQuantity(line: CartLine, quantity: number) {
    if (line.id !== undefined) {
      const result = await cartApi.updateCartItem(line.id, quantity)
      setItems(result)
    } else {
      setItems((prev) => {
        const next = prev.map((l) =>
          l.productId === line.productId && l.size === line.size ? { ...l, quantity } : l,
        )
        writeGuestCart(next)
        return next
      })
    }
  }

  async function removeItem(line: CartLine) {
    if (line.id !== undefined) {
      const result = await cartApi.removeCartItem(line.id)
      setItems(result)
    } else {
      setItems((prev) => {
        const next = prev.filter((l) => !(l.productId === line.productId && l.size === line.size))
        writeGuestCart(next)
        return next
      })
    }
  }

  async function mergeGuestCart() {
    const guestLines = readGuestCart()
    if (guestLines.length === 0) {
      const result = await cartApi.getCart()
      setItems(result)
      return
    }

    const payload = guestLines.map((l) => ({ productId: l.productId, size: l.size, quantity: l.quantity }))
    const result = await cartApi.mergeCart(payload)
    setItems(result)
    clearGuestCart()
  }

  function resetToGuest() {
    setItems([])
    clearGuestCart()
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        itemCount,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
        addItem,
        updateQuantity,
        removeItem,
        mergeGuestCart,
        resetToGuest,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
