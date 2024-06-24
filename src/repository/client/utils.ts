import { ApiResponse, getInvalidTokenPayload } from '@/http/common/response'
import { makeRequest as commonMakeRequest, execute } from '@/http/common/utils'
import { HttpRequest, HttpRequestOption } from '@/http/core/request'

// MEMO: Client에서 '/' 경로는 호스트 URL 이후 경로로 설정됨. (eg: http://localhost:3000/~~~~)
export const CLIENT_API_BASE_URL = '/'

const clientRefreshRequest = makeRequest('api/login/refresh', {
  method: 'post',
})

export function makeRequestWithCustomer(
  path: string,
  option?: HttpRequestOption,
): HttpRequest {
  const customerToken = getCustomerToken()

  if (option) {
    if (option.headers) {
      option.headers = {
        ...option.headers,
        customer: customerToken,
      }
    } else {
      option.headers = {
        customer: customerToken,
      }
    }
  } else {
    option = {
      headers: {
        customer: customerToken,
      },
    }
  }
  if (option && !option.cache) {
    option.cache = 'no-cache'
  }
  return commonMakeRequest(CLIENT_API_BASE_URL, path, option)
}

export function makeRequest(
  path: string,
  option?: HttpRequestOption,
): HttpRequest {
  if (option && !option.cache) {
    option.cache = 'no-cache'
  }
  return commonMakeRequest(CLIENT_API_BASE_URL, path, option)
}

export function makeRequestOption(option?: HttpRequestOption) {
  return option
}

export async function executeWithAuth<T>(
  request: HttpRequest,
  transform?: (rawJson: any) => T,
): Promise<ApiResponse<T>> {
  let hasRefresh = isPendingRefreshTokenState()
  let response: ApiResponse<T>

  if (!hasRefresh) {
    response = await execute(request, transform)
    hasRefresh = response.status === 401
  }
  if (hasRefresh) {
    const isRefreshed = await refreshCookieToken()
    if (isRefreshed) {
      response = await execute(request, transform)
    } else {
      response = getInvalidTokenPayload()
    }
  }
  return response!!
}

function getCustomerToken(): string | undefined {
  let customerToken: string | undefined = undefined
  if (window) {
    customerToken = window.sessionStorage.getItem('CustomerToken') || undefined
  }
  return customerToken
}

function isPendingRefreshTokenState() {
  const refreshManager = getRefreshTokenManager()
  return refreshManager?.status === 'pending'
}

async function refreshCookieToken() {
  const refreshManager = getRefreshTokenManager()

  if (refreshManager) {
    if (refreshManager.status === 'on') {
      refreshManager.status = 'pending'

      let response = await execute(clientRefreshRequest)
      refreshManager.status = 'finish'
      const result = response.ok

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500))

      refreshManager.watcher.forEach((watch: (bool: boolean) => void) => {
        watch(result)
      })
      refreshManager.watcher.splice(0, refreshManager.watcher.length)
      refreshManager.status = 'on'
      if (result) {
        return true
      } else {
        publisherRejectRefreshToken()
        return false
      }
    } else if (refreshManager.status === 'pending') {
      const response = await new Promise<boolean>((resolve) => {
        refreshManager.watcher.push((bool: boolean) => {
          resolve(bool)
        })
      })
      return response
    }
  } else {
    let response = await execute(clientRefreshRequest)
    if (response.ok) {
      return true
    } else {
      return false
    }
  }
  return false
}

let refreshRejectEventListener: (() => void) | undefined = undefined
const _REFRASH: RefreshTokenManager = {
  status: 'on',
  watcher: [],
}

function getRefreshTokenManager(): RefreshTokenManager {
  return _REFRASH
}

function publisherRejectRefreshToken() {
  if (refreshRejectEventListener) {
    refreshRejectEventListener()
  }
}

export function registRejectRefreshToken(rejectCallback: () => void) {
  refreshRejectEventListener = rejectCallback
}

export function unregistRejectRefreshToken() {
  refreshRejectEventListener = undefined
}

type RefreshTokenStatus = 'on' | 'pending' | 'finish'
type RefreshTokenManager = {
  status: RefreshTokenStatus
  watcher: ((bool: boolean) => void)[]
}
