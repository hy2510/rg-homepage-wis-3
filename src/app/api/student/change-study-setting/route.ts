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
    'type',
    'startScreen',
    'isEbkListenRepeat',
    'isEb1ListenRepeat',
    'isViewStep3Hint',
    'isViewStep2Skip',
    'studyReadingUnitId',
  )

  const pType = parameter.getString('type', 'All')
  const pStartScreen = parameter.getString('startScreen', '')
  const startScreen = pStartScreen === '' ? undefined : pStartScreen
  const pEbkListenRepeat = parameter.getString('isEbkListenRepeat', '')
  const isEbkListenRepeat =
    pEbkListenRepeat === '' ? undefined : pEbkListenRepeat === 'true'

  const pEb1ListenRepeat = parameter.getString('isEb1ListenRepeat', '')
  const isEb1ListenRepeat =
    pEb1ListenRepeat === '' ? undefined : pEb1ListenRepeat === 'true'

  const pViewStep3Hint = parameter.getString('isViewStep3Hint', '')
  const isViewStep3Hint =
    pViewStep3Hint === '' ? undefined : pViewStep3Hint === 'true'
  const pViewStep2Skip = parameter.getString('isViewStep2Skip', '')
  const isViewStep2Skip =
    pViewStep2Skip === '' ? undefined : pViewStep2Skip === 'true'
  const pStudyReadingUnitId = parameter.getString('studyReadingUnitId', '')
  const studyReadingUnitId =
    pStudyReadingUnitId === '' ? undefined : pStudyReadingUnitId

  const [payload, status, error] = await executeRequestAction(
    Student.changeStudySetting(token, {
      type: pType,
      startScreen,
      isEb1ListenRepeat,
      isEbkListenRepeat,
      isViewStep2Skip,
      isViewStep3Hint,
      studyReadingUnitId,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
