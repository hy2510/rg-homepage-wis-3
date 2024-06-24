import 'server-only'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { redirect } from 'next/navigation'
import SITE_PATH from '../site-path'

export default function useLoginBarrierRedirect(params?: {
  isLogoffOnly?: boolean
  redirectPath?: string
}): void {
  const authorization = getAuthorizationWithCookie()
  const isLogin = authorization.isLogin()
  const { isLogoffOnly, redirectPath } = params || {
    isLogoffOnly: false,
    redirectPath: undefined,
  }
  if (isLogoffOnly === isLogin) {
    redirect(redirectPath ? redirectPath : SITE_PATH.HOME.MAIN)
  }
}
