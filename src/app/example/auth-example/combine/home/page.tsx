import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import ClientLogoutButton from '../../ClientLogoutButton'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AuthorizationGuard from '@/authorization/server/AuthorizationGuard'

export default function Page() {
  const authorization = getAuthorizationWithCookie()
  const isLogin = authorization.isLogin()

  if (!isLogin) {
    redirect(`./login`)
  } else {
  }

  return (
    <AuthorizationGuard id={authorization.token?.tag || ''}>
      <main>
        <p>Home Page {new Date().toUTCString()}</p>
        <p>{JSON.stringify(authorization?.token?.refreshToken)}</p>
        <ClientLogoutButton />
        <Link href="./about">Home2</Link>
      </main>
    </AuthorizationGuard>
  )
}
