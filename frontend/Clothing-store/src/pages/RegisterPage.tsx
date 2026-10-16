import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'
import { ApiError } from '../lib/api'
import type { AuthRedirectState, RegisterInput } from '../types/auth'

const emptyForm: RegisterInput = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  postalCode: '',
  street: '',
  houseNumber: '',
}

export function RegisterPage() {
  const auth = useAuth()
  const cart = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as AuthRedirectState | null) ?? null

  const [form, setForm] = useState<RegisterInput>(emptyForm)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (auth.status === 'authenticated') {
    return <Navigate to={state?.from?.pathname ?? '/'} replace />
  }

  function update<K extends keyof RegisterInput>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    setError(null)

    if (Object.values(form).some((value) => !value.trim())) {
      setError('All fields are required.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      await auth.register(form)
      await cart.mergeGuestCart()
      navigate(state?.from?.pathname ?? '/', { replace: true })
      if (state?.cartIntent) cart.openDrawer()
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError('This email is already registered.')
      } else if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="container-narrow flex flex-col gap-8 py-16">
      <h1>Create an account</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="label">First name</span>
            <input
              className="input"
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              autoComplete="given-name"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="label">Last name</span>
            <input
              className="input"
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              autoComplete="family-name"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="label">Email</span>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
          />
        </label>
        <div className="grid grid-cols-3 gap-4">
          <label className="col-span-2 flex flex-col gap-1">
            <span className="label">Street</span>
            <input
              className="input"
              value={form.street}
              onChange={(e) => update('street', e.target.value)}
              autoComplete="address-line1"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="label">House no.</span>
            <input
              className="input"
              value={form.houseNumber}
              onChange={(e) => update('houseNumber', e.target.value)}
              autoComplete="address-line2"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="label">Postal code</span>
          <input
            className="input"
            value={form.postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
            autoComplete="postal-code"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="label">Password</span>
          <input
            className="input"
            type="password"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            autoComplete="new-password"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="label">Confirm password</span>
          <input
            className="input"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => update('confirmPassword', e.target.value)}
            autoComplete="new-password"
          />
        </label>
        {error && <p className="text-sm text-accent">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <p className="text-sm text-ink-soft">
        Already have an account?{' '}
        <Link to="/login" state={state} className="link">
          Log in
        </Link>
      </p>
    </main>
  )
}
