export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
}

export type RegisterInput = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  postalCode: string
  street: string
  houseNumber: string
}

export type AuthRedirectState = {
  from?: { pathname: string }
  cartIntent?: boolean
}
