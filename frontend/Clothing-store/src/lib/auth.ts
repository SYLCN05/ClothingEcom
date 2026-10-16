import { apiFetch, ApiError, parseErrorMessage } from './api'
import type { RegisterInput, User } from '../types/auth'

export async function register(input: RegisterInput): Promise<User> {
  const res = await apiFetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new ApiError(res.status, await parseErrorMessage(res))
  return res.json() as Promise<User>
}

export async function login(email: string, password: string): Promise<User> {
  const res = await apiFetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new ApiError(res.status, await parseErrorMessage(res))
  return res.json() as Promise<User>
}

export async function logout(): Promise<void> {
  await apiFetch('/api/auth/logout', { method: 'POST' })
}

export async function getMe(): Promise<User | null> {
  const res = await apiFetch('/api/auth/me')
  if (res.status === 401) return null
  if (!res.ok) throw new ApiError(res.status, await parseErrorMessage(res))
  return res.json() as Promise<User>
}
