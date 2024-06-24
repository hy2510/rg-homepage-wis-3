import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'

export async function POST(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'classId',
    'levelRoundId',
    'studyId',
    'studentHistoryId',
    'mode',
  )
  const levelRoundId = parameter.getString('levelRoundId')
  const studyId = parameter.getString('studyId')
  const studentHistoryId = parameter.getString('studentHistoryId')
  const classId = parameter.getString('classId')
  const mode = parameter.getString('mode')

  const action = Library.studyModeSetting(token, {
    levelRoundId,
    studyId,
    studentHistoryId,
    classId,
    mode,
  })
  const [payload, status, error] = await executeRequestAction(action)

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
