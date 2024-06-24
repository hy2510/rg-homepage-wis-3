import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse } from '@/repository/server/utils'

type Parameters = {
  getString: (key: string, defaultValue?: string) => string
  getNumber: (key: string, defaultValue?: number) => number
  print: () => unknown
}

export async function getParameters(
  request: NextRequest,
  ...keys: string[]
): Promise<Parameters> {
  return makeParameters(request, false, ...keys)
}

export async function getBodyParameters(
  request: NextRequest,
  ...keys: string[]
): Promise<Parameters> {
  return makeParameters(request, true, ...keys)
}

async function makeParameters(
  request: NextRequest,
  isBody: boolean,
  ...keys: string[]
): Promise<Parameters> {
  const map = new Map<string, string>()

  const searchParams = request.nextUrl.searchParams
  let data: any = undefined
  if (isBody) {
    try {
      data = await request.json()
    } catch (error) {}
  }
  keys.forEach((k) => {
    let value = searchParams.get(k)
    if (value !== null) {
      map.set(k, value)
    } else if (data && data[k] !== null) {
      map.set(k, String(data[k]))
    }
  })
  const parameter = {
    getString: (key: string, defaultVal?: string) => {
      const value = map.get(key)
      if (value) {
        return value
      } else {
        return defaultVal ? defaultVal : ''
      }
    },
    getNumber: (key: string, defaultVal?: number) => {
      const value = Number(map.get(key))
      if (value) {
        return value
      } else {
        return defaultVal ? defaultVal : 0
      }
    },
    print: () => {
      let print: any = {}
      map.forEach((value: unknown, key: string) => {
        print[key] = value
      })
      return print
    },
  }
  return parameter
}

export async function executeRequestAction(
  action: Promise<ApiResponse>,
): Promise<[any, { status: number }, any]> {
  let payload: any = undefined
  let status = {
    status: 400,
  }
  try {
    const res = await action
    if (!res.extra) {
      payload = res.data
    } else {
      payload = {
        code: res.extra.code,
        message: res.extra.message,
      }
    }
    status.status = res.status
    return [payload, status, undefined]
  } catch (error) {
    return [undefined, status, error]
  }
}

export function getExceptionResponsePayload(payload: any) {
  const response: {
    code: number
    message: string
  } = {
    code: payload.code,
    message: payload.message,
  }
  return response
}

function commonErrorResponse(): NextResponse {
  return basicResponse({ code: 9999, message: 'Common Error' }, { status: 500 })
}

function invalidAccessTokenResponse(): NextResponse {
  return basicResponse(
    {
      code: 2000,
      message: 'Invalid Access Token',
    },
    { status: 401 },
  )
}

function invalidCustomerTokenResponse(): NextResponse {
  return basicResponse(
    {
      code: 2000,
      message: 'Invalid Customer Token',
    },
    { status: 400 },
  )
}

function basicResponse(payload: any, status: { status: number }): NextResponse {
  if (400 <= status.status && status.status < 500) {
    const newPayload = {
      code: payload.code,
      extra: payload.message,
    }
    return NextResponse.json(newPayload, status)
  }
  return NextResponse.json(payload, status)
}

export const RouteResponse = {
  commonError: commonErrorResponse,
  invalidAccessToken: invalidAccessTokenResponse,
  invalidCustomerToken: invalidCustomerTokenResponse,
  response: basicResponse,
}
