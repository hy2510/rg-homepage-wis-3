import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'

export async function PUT(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(request, 'deviceType', 'mobileYn')
  const deviceType = parameter.getString('deviceType', '')
  const mobileYn = parameter.getString('mobileYn', 'N')

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const todayStr = `${year}${month > 9 ? month : `0${month}`}${day}`

  const [queryPayload, queryStatus, queryError] = await executeRequestAction(
    Student.attendance(token, { date: todayStr }),
  )
  if (queryStatus.status >= 200 && queryStatus.status < 300) {
    if (!queryPayload.IsAttend) {
      const [payload, status, error] = await executeRequestAction(
        Student.attendanceInsert(token, {
          ip: '127.0.0.1',
          deviceType,
          mobileYn,
        }),
      )

      if (error) {
        return RouteResponse.commonError()
      }
      return RouteResponse.response(payload, status)
    } else {
      return RouteResponse.response({ success: true }, { status: 200 })
    }
  }

  if (queryError) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(queryPayload, queryStatus)
}
