import { RouteResponse, executeRequestAction } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import ReadingKing from '@/repository/server/readingking'

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } },
) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const eventId = params.eventId

  const [payload, status, error] = await executeRequestAction(
    ReadingKing.eventDetail(token, { eventId }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
