import SITE_PATH from '@/app/site-path'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { redirect } from 'next/navigation'

export default function Page() {
  const authToken = getAuthorizationWithCookie().getAccessToken()
  if (authToken) {
    redirect(SITE_PATH.HOME.MAIN)
  } else {
    redirect(SITE_PATH.ACCOUNT.MAIN)
  }
}
