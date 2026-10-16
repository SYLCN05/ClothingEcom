import { useContext } from 'react'
import { CartContext } from './cartContextDefinition'
import type { CartContextValue } from './cartContextDefinition'

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
