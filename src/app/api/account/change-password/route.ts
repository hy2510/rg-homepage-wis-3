import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '@/app/api/_util'
import { setTokenWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest, NextResponse } from 'next/server'
import Student from '@/repository/server/student'

export async function POST(request: NextRequest) {
  const parameter = await getBodyParameters(request, 'hash', 'newPassword')
  const hash = parameter.getString('hash', '')
  const newPassword = parameter.getString('newPassword', '')

  if (!hash || !newPassword) {
    return NextResponse.json({ message: 'Invalid parameter' }, { status: 400 })
  }

  const tokenObj = JSON.parse(atob(hash))

  const [payload, status, error] = await executeRequestAction(
    Student.overwritePassword(tokenObj.accessToken, { newPassword }),
  )

  if (status.status >= 200 && status.status < 300) {
    let nextResponse = setTokenWithCookie(
      NextResponse.json({ success: true }, { status: 200 }),
      tokenObj,
    )
    return nextResponse
  }
  if (error) {
    return RouteResponse.commonError()
  }

  return RouteResponse.response(payload, status)
}
