import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
  getExceptionResponsePayload,
} from '@/app/api/_util'
import { setTokenWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest, NextResponse } from 'next/server'
import Account from '@/repository/server/account'

export async function POST(request: NextRequest) {
  const customer = getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }
  const parameter = await getBodyParameters(
    request,
    'id',
    'password',
    'deviceType',
  )
  const id = parameter.getString('id')
  const password = parameter.getString('password')
  const deviceType = parameter.getString('deviceType')

  const [payload, status, error] = await executeRequestAction(
    Account.signin(customer, { id, password, deviceType }),
  )

  if (status.status >= 200 && status.status < 300) {
    const token = {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      tag: 'tag',
    }
    if (payload.role) {
      const hash = btoa(JSON.stringify(token))
      let nextResponse = NextResponse.json(
        {
          code: 2002,
          extra: {
            hash,
          },
        },
        { status: 400 },
      )
      return nextResponse
    } else if (payload.isChangePassword) {
      const hash = btoa(JSON.stringify(token))
      return NextResponse.json(
        {
          code: 2001,
          extra: {
            hash,
          },
        },
        { status: 400 },
      )
    } else {
      let nextResponse = setTokenWithCookie(
        NextResponse.json({ success: true }, { status: 200 }),
        token,
      )
      return nextResponse
    }
  } else if (status.status >= 400 && status.status < 500) {
    const exceptionBody = getExceptionResponsePayload(payload)
    if (exceptionBody.message === 'password mismatch') {
      let nextResponse = NextResponse.json({ code: 3000 }, status)
      return nextResponse
    }
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return NextResponse.json({ code: 9998 }, { status: 500 })
}
