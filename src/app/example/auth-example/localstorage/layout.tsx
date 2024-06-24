import AuthorizationProvider from '@/authorization/client/AuthorizationContext-b'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authorization = getAuthorizationWithCookie()
  return (
    <AuthorizationProvider id={authorization.token?.tag || ''}>
      <h2>Auth Page(localstorage)</h2>
      {children}
    </AuthorizationProvider>
  )
}
