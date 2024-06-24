import { headers } from 'next/headers'

const HEADER_COOKIE_KEY = 'customer'

export function getCustomerWithHeader(): string | undefined {
  const tokenCookie = headers().get(HEADER_COOKIE_KEY)
  return tokenCookie || undefined
}
