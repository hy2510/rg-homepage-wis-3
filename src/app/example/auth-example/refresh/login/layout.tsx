import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'

export default function Layout({ children }: { children: React.ReactNode }) {
  const authorization = getAuthorizationWithCookie()

  return <>{children}</>
}
