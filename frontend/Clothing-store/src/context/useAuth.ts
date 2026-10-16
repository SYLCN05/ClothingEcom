import { useContext } from 'react'
import { AuthContext } from './authContextDefinition'
import type { AuthContextValue } from './authContextDefinition'

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
