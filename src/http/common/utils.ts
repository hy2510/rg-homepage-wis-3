import { http } from '../core/call'
import { HttpRequest, HttpRequestOption } from '../core/request'
import { ApiResponse } from './response'

export const DEFAULT_TIMEOUT = 15 * 1000
export const DEFAULT_CONTENT_TYPE = 'application/json'

export function makeRequest(
  host: string,
  path: string,
  option?: HttpRequestOption,
): HttpRequest {
  return {
    url: `${host}${path}`,
    contentType: DEFAULT_CONTENT_TYPE,
    timeout: DEFAULT_TIMEOUT,
    ...option,
  }
}

export async function execute<T>(
  request: HttpRequest,
  transform?: (rawJson: any) => T,
): Promise<ApiResponse<T>> {
  try {
    const response = await http.call(request)
    if (response.ok) {
      const json = await response.json()

      //FIXME - json Response 템플릿 미확정으로 하도코딩 함. hard coding
      const data = transform ? transform(json) : (json as T)

      return {
        ok: response.ok,
        status: response.status,
        result: {
          code: 0,
          message: 'success',
        },
        data,
      }
    } else {
      const json = await response.json()
      return {
        ok: false,
        status: response.status,
        result: {
          code: json.code,
          message: json.message,
        },
        extra: json.extra ? json.extra : undefined,
      }
    }
  } catch (error: any) {
    return {
      ok: false,
      status: 500,
      result: {
        code: 999999,
        message: 'Internal Server Error',
      },
    }
  }
}
