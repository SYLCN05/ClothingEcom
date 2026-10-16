import type { Product } from '../types/product'

const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
  });
}

export async function getProducts(): Promise<Product[]> {
  const res = await apiFetch('/api/products')
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`)
  return res.json() as Promise<Product[]>
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const res = await apiFetch(`/api/products/${id}`)
  if (res.status === 404) return undefined
  if (!res.ok) throw new Error(`Failed to load product ${id} (${res.status})`)
  return res.json() as Promise<Product>
}
