import 'server-only'
import { makeRequest as commonMakeRequest } from '@/http/common/utils'
import { http } from '@/http/core/call'
import { HttpRequest, HttpRequestOption } from '@/http/core/request'

export const API_BASE_URL = process.env.API_BASE_URL
const BASE_VERSION = process.env.API_BASE_VERSION

export function makeRequest({
  customer,
  token,
  path,
  ver,
  option,
}: {
  customer?: string
  token?: string
  path: string
  ver?: string
  option?: HttpRequestOption
}): HttpRequest {
  const baseUrl = `${API_BASE_URL}${ver ? `${ver}/` : `${BASE_VERSION}/`}`
  let wrapOption: HttpRequestOption | undefined = option
  if (token) {
    if (wrapOption) {
      if (wrapOption.headers) {
        wrapOption.headers.Authorization = `Bearer ${token}`
      } else {
        wrapOption.headers = {
          Authorization: `Bearer ${token}`,
        }
      }
    } else {
      wrapOption = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    }
  } else if (customer) {
    if (wrapOption) {
      if (wrapOption.headers) {
        wrapOption.headers.Customer = customer
      } else {
        wrapOption.headers = {
          Customer: customer,
        }
      }
    } else {
      wrapOption = {
        headers: {
          Customer: customer,
        },
      }
    }
  }
  if (wrapOption && !wrapOption.cache) {
    wrapOption.cache = 'no-cache'
  }
  return commonMakeRequest(baseUrl, path, wrapOption)
}

type NextCacheOption = {
  next: {
    revalidate?: number | false
    tags?: string[]
  }
}
export async function execute(
  request: HttpRequest,
  nextCache?: NextCacheOption,
): Promise<ApiResponse> {
  const payload: ApiResponse = {
    ok: false,
    status: 500,
  }
  try {
    if (nextCache) {
      request.cache = undefined
    }
    const response = await http.call(request, nextCache)
    payload.ok = response.ok
    payload.status = response.status
    if (response.ok) {
      payload.data = await response.json()
    } else {
      payload.extra = await response.json()
    }
  } catch (error) {}
  return payload
}

export interface ApiResponse {
  ok: boolean
  status: number
  data?: any
  extra?: any
}
