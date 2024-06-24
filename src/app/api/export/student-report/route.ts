import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Export from '@/repository/server/export'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(
    request,
    'studyIds',
    'studentHistoryIds',
  )
  const studyIds = parameter.getString('studyIds', '')
  const studentHistoryIds = parameter.getString('studentHistoryIds', '')

  const [payload, status, error] = await executeRequestAction(
    Export.studentReport(token, { studyIds, studentHistoryIds }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
