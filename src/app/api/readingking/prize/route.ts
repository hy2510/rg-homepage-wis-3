import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import ReadingKing from '@/repository/server/readingking'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'eventId')
  const eventId = parameter.getString('eventId')

  const [payload, status, error] = await executeRequestAction(
    ReadingKing.prizeList({ accessToken: token }, { eventId }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function POST(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(request, 'eventId', 'eventPrizeId')
  const eventId = parameter.getString('eventId')
  const prizeId = parameter.getString('eventPrizeId')

  const [payload, status, error] = await executeRequestAction(
    ReadingKing.setPrize(token, { eventId, prizeId }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
