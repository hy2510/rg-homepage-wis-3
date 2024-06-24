import { ApiResponse } from '@/http/common/response'

export interface FetchState {
  isLoading: boolean
  error: any
}

export interface PayloadState<T> extends FetchState {
  payload: T
}

export const initialPayloadState = <T>(payload: T) => ({
  isLoading: false,
  error: undefined,
  payload,
})

export type BasicFetchAction<T> = (fs?: FetchState, state?: T) => void

export type FetcherResponse<T> = {
  isSuccess: boolean
  payload: T | undefined
  error: any
}

async function fetcherResponse<T>(
  data: Promise<ApiResponse<T>>
): Promise<FetcherResponse<T>> {
  let payload: T | undefined = undefined
  let error = undefined
  let isSuccess = false

  const response = await data
  if (response.ok) {
    isSuccess = true
    if (response.data) {
      payload = response.data
    }
  } else {
    const extra = response.extra || undefined
    error = { ...response.result, extra }
  }
  return { isSuccess, payload, error }
}

export const fetcher = {
  response: fetcherResponse,
}
