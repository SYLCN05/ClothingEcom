import { createContext } from 'react'
import type { RegisterInput, User } from '../types/auth'

export type AuthStatus = 'loading' | 'authenticated' | 'guest'

export type AuthContextValue = {
  user: User | null
  status: AuthStatus
  login: (email: string, password: string) => Promise<User>
  register: (input: RegisterInput) => Promise<User>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
