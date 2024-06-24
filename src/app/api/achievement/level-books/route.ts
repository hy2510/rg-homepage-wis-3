import { RouteResponse, executeRequestAction } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Achieve from '@/repository/server/achieve'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const action = Achieve.levelBooks(token)
  const [payload, status, error] = await executeRequestAction(action)
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
