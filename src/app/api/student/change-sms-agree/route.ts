import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'

export async function POST(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'studyReportYn',
    'eventInformationYn',
  )
  const studyReportYn = parameter.getString('studyReportYn', 'false') === 'true'
  const eventInformationYn =
    parameter.getString('eventInformationYn', 'false') === 'true'

  const [payload, status, error] = await executeRequestAction(
    Student.changeSmsAgree(token, {
      studyReportYn,
      eventInformationYn,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
