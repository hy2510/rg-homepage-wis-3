import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const [payload, status, error] = await executeRequestAction(
    Student.studentDailyLearning(token),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function PUT(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'type', 'level', 'value')
  const type = parameter.getString('type', '').toLocaleLowerCase()

  let requestAction
  if (type === 'level') {
    const level = parameter.getString('level')
    requestAction = Student.studentDailyLearningSaveLevel(token, { level })
  } else if (type === 'points') {
    const level = parameter.getString('level')
    const value = parameter.getNumber('value')
    requestAction = Student.studentDailyLearningSave(token, {
      type: 'Points',
      level: level,
      value: value,
    })
  } else if (type === 'books') {
    const level = parameter.getString('level')
    const value = parameter.getNumber('value')
    requestAction = Student.studentDailyLearningSave(token, {
      type: 'Books',
      level: level,
      value: value,
    })
  } else {
    throw new Error('TODO _ FIXMIE _ ERROR ')
  }
  const [payload, status, error] = await executeRequestAction(requestAction)
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
