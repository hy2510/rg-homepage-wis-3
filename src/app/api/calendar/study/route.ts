import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import History from '@/repository/server/history'
import { RouteResponse, executeRequestAction, getParameters } from '../../_util'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'year', 'month')

  const nowDate = new Date()
  const year = parameter.getNumber('year', nowDate.getFullYear())
  const month = parameter.getNumber('month', nowDate.getMonth() + 1)

  const action = History.studyCalendar(token, {
    year,
    month,
  })

  const [payload, status, error] = await executeRequestAction(action)
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
