import { HttpRequest } from './request'

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
export type Cache =
  | 'default'
  | 'no-cache'
  | 'force-cache'
  | 'reload'
  | 'only-if-cached'
export type Cors = 'cors' | 'no-cors' | 'same-origin'

async function call(
  request: HttpRequest,
  extensionConfig?: unknown,
): Promise<Response> {
  const abortController = new AbortController()

  const contentType = getContentType(request)
  const headers = {
    ...request.headers,
  }
  if (contentType) {
    headers['Content-Type'] = contentType
  }
  const config = Object.assign(
    {
      method: getMethod(request).toUpperCase(),
      mode: getCors(request),
      cache: getCache(request),
      headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
      signal: abortController.signal,
    },
    extensionConfig,
  )
  const queryStringSerialize = getQueryString(request)

  const url = `${request.url}${queryStringSerialize}`
  const fetchTask = fetch(url, config)
  let excutePromise: Promise<unknown>
  const timeout = getTimeout(request)
  if (timeout > 0) {
    const timerAbortController = new AbortController()
    const timerSignal = timerAbortController.signal
    const timeoutTask = new Promise((_, reject) => {
      const timer = setTimeout(() => {
        timerSignal.removeEventListener('abort', abortEvent)
        reject(new Error('timeout'))
      }, timeout)
      const abortEvent = () => {
        clearTimeout(timer)
      }
      timerSignal.addEventListener('abort', abortEvent)
    })
    excutePromise = Promise.race([timeoutTask, fetchTask])
  } else {
    excutePromise = Promise.all([fetchTask])
  }
  try {
    const response = (await excutePromise) as Response
    return response
  } catch (error: any) {
    if (error && error.message === 'timeout') {
      abortController.abort()
    }
    throw wrapError(request, error)
  }
}

function wrapError(request: HttpRequest, error: Error) {
  const e: any = new Error(error.message)
  e['req'] = request
  return e
}

function getMethod(request: HttpRequest): Method {
  let val: Method = 'get'
  if (request.method === 'get') {
    val = 'get'
  } else if (request.method === 'post') {
    val = 'post'
  } else if (request.method === 'put') {
    val = 'put'
  } else if (request.method === 'delete') {
    val = 'delete'
  } else if (request.method === 'patch') {
    val = 'patch'
  }
  return val
}

function getCache(request: HttpRequest): Cache | undefined {
  let val: Cache | undefined = undefined
  if (request.cache === 'no-cache') {
    val = 'no-cache'
  } else if (request.cache === 'force-cache') {
    val = 'force-cache'
  } else if (request.cache === 'default') {
    val = 'default'
  } else if (request.cache === 'reload') {
    val = 'reload'
  } else if (request.cache === 'only-if-cached') {
    val = 'only-if-cached'
  }
  return val
}

function getCors(request: HttpRequest): Cors {
  let val: Cors = 'cors'
  if (request.cors === 'cors') {
    val = 'cors'
  } else if (request.cors === 'no-cors') {
    val = 'no-cors'
  } else if (request.cors === 'same-origin') {
    val = 'same-origin'
  }
  return val
}

function getQueryString(request: HttpRequest): string {
  let val = ''
  if (request.queryString) {
    const qs = request.queryString
    const keys = Object.keys(qs)
    let tmp = ''
    keys.forEach((key) => {
      const val = qs[key]
      if (val) {
        tmp += `${key}=${qs[key]}&`
      }
    })
    if (tmp.length > 0) {
      val = `?${tmp.substring(0, tmp.length - 1)}`
    }
  }
  return val
}

function getContentType(request: HttpRequest): string {
  let val = 'text/plain'
  const contentType = request.contentType
  if (contentType) {
    val = contentType
  }
  return val
}

function getTimeout(request: HttpRequest): number {
  let val = 30000
  if (request.timeout !== undefined) {
    const timeout = request.timeout
    if (timeout <= 0) {
      val = -1
    } else {
      val = timeout
    }
  }
  return val
}

export const http = {
  call,
}
