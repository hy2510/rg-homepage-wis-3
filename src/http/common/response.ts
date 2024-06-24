export interface ApiResponse<T> {
  ok: boolean
  status: number
  result: {
    code: number
    message: string
  }
  data?: T
  extra?: any
}

export function getInvalidTokenPayload(): ApiResponse<any> {
  return {
    ok: false,
    status: 400,
    result: {
      code: 401001,
      message: 'Invalid Token.',
    },
    data: undefined,
  }
}
