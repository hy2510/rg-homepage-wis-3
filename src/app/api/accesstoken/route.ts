import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import { RouteResponse } from '../_util'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const payload = {
    token,
  }
  const status = {
    status: 200,
  }
  return RouteResponse.response(payload, status)
}
