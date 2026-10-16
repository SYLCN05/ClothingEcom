import { apiFetch, ApiError, parseErrorMessage } from './api'
import type { CartLine } from '../types/cart'

// keep in sync with CartController.MaxQuantityPerLine on the backend
export const MAX_CART_QUANTITY = 10

async function cartResponse(res: Response): Promise<CartLine[]> {
  if (!res.ok) throw new ApiError(res.status, await parseErrorMessage(res))
  return res.json() as Promise<CartLine[]>
}

export async function getCart(): Promise<CartLine[]> {
  return cartResponse(await apiFetch('/api/cart'))
}

export async function addCartItem(productId: number, size: string, quantity: number): Promise<CartLine[]> {
  return cartResponse(
    await apiFetch('/api/cart/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, size, quantity }),
    }),
  )
}

export async function updateCartItem(id: number, quantity: number): Promise<CartLine[]> {
  return cartResponse(
    await apiFetch(`/api/cart/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    }),
  )
}

export async function removeCartItem(id: number): Promise<CartLine[]> {
  return cartResponse(await apiFetch(`/api/cart/items/${id}`, { method: 'DELETE' }))
}

export async function mergeCart(
  lines: { productId: number; size: string; quantity: number }[],
): Promise<CartLine[]> {
  return cartResponse(
    await apiFetch('/api/cart/merge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: lines }),
    }),
  )
}
