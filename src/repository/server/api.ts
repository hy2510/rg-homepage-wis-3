import 'server-only'
import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from './utils'

export async function getCheckExample(
  token: string,
  data?: { pp: number },
): Promise<ApiResponse<{ pp?: number }>> {
  const request = makeRequest({
    path: 'check-example',
    option: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      queryString: {
        p: data?.pp,
      },
    },
  })
  const response = await execute<{ pp?: number }>(request, (json: any) => {
    return {
      pp: data?.pp,
    }
  })
  return response
}

export async function getFreeExample(): Promise<
  ApiResponse<{ time: string; label: string }>
> {
  const request = makeRequest({ path: 'free-example' })
  const response = await execute<{ time: string; label: string }>(
    request,
    (json: any) => {
      return {
        time: json.time as string,
        label: json.message as string,
      }
    },
  )
  return response
}

export async function getServerExample(): Promise<
  ApiResponse<{ time: string; label: string }>
> {
  const request = makeRequest({ path: 'server-example' })
  const response = await execute<{ time: string; label: string }>(
    request,
    (json: any) => {
      return {
        time: json.time as string,
        label: json.message as string,
      }
    },
  )
  return response
}

export async function postLogin(data: {
  username: string
  password: string
}): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
  const request = makeRequest({
    path: 'login',
    option: {
      method: 'post',
      body: { id: data.username, pw: data.password },
    },
  })
  const response = await execute<{ accessToken: string; refreshToken: string }>(
    request,
    (json: any) => {
      return {
        accessToken: json.accessToken as string,
        refreshToken: json.refreshToken as string,
      }
    },
  )
  return response
}

export async function postRefreshToken(
  token: string,
  data: {
    refreshToken: string
  },
): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
  const request = makeRequest({
    path: 'demo/refresh',
    option: {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: { ...data },
    },
  })
  const response = await execute<{ accessToken: string; refreshToken: string }>(
    request,
    (json: any) => {
      return {
        accessToken: json.accessToken as string,
        refreshToken: json.refreshToken as string,
      }
    },
  )
  return response
}
