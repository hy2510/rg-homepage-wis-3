import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import ClientLogoutButton from '../../ClientLogoutButton'
import AuthorizationGuard from '@/authorization/server/AuthorizationGuard'

export default function Page() {
  const authorization = getAuthorizationWithCookie()
  const isLogin = authorization.isLogin()

  return (
    <AuthorizationGuard id={authorization.token?.tag || ''}>
      <main>
        <p>Home Page {new Date().toISOString()}</p>
        <p>{JSON.stringify(authorization?.token?.refreshToken)}</p>
        {isLogin ? <ClientLogoutButton /> : <></>}
      </main>
    </AuthorizationGuard>
  )
}
