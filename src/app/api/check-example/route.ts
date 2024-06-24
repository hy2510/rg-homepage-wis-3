import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { getCheckExample } from '@/repository/server/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const p = Number(searchParams.get('p'))

  const authorization = getAuthorizationWithCookie()
  const token = authorization.getAccessToken()
  if (!authorization.isLogin() || !token) {
    return NextResponse.json({ message: 'not login' }, { status: 401 })
  }

  const response = await getCheckExample(token, { pp: p })
  if (response.ok) {
    return NextResponse.json(response.data, { status: response.status })
  }
  return NextResponse.json(response.extra, { status: response.status })
}
