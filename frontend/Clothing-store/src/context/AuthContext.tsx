import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import * as authApi from '../lib/auth'
import { AuthContext } from './authContextDefinition'
import type { AuthStatus } from './authContextDefinition'
import type { RegisterInput, User } from '../types/auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    let cancelled = false
    authApi
      .getMe()
      .then((me) => {
        if (cancelled) return
        setUser(me)
        setStatus(me ? 'authenticated' : 'guest')
      })
      .catch(() => {
        if (cancelled) return
        setUser(null)
        setStatus('guest')
      })
    return () => {
      cancelled = true
    }
  }, [])

  async function login(email: string, password: string) {
    const me = await authApi.login(email, password)
    setUser(me)
    setStatus('authenticated')
    return me
  }

  async function register(input: RegisterInput) {
    const me = await authApi.register(input)
    setUser(me)
    setStatus('authenticated')
    return me
  }

  async function logout() {
    await authApi.logout()
    setUser(null)
    setStatus('guest')
  }

  return (
    <AuthContext.Provider value={{ user, status, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
