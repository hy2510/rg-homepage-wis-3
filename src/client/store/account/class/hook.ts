import { useEffect, useState } from 'react'
import repository from '@/repository/client'
import { ClassGroupResponse } from '@/repository/client/account/class-group'
import { ClassListResponse } from '@/repository/client/account/class-list'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useOnLoadClassGroup() {
  const { loading, setLoading, error, setError, success, setSuccess } =
    useFetchBasicState()

  const [payload, setPayload] = useState<ClassGroupResponse>([])
  useEffect(() => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getClassGroup({}))

      if (res.isSuccess) {
        if (res.payload) {
          setPayload(res.payload)
        }
      } else {
        setError(res.error)
      }
      setLoading(false)
    }
    fetching()
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
    payload,
  }
}

export function useFetchClassList() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    classGroupId,
    callback,
  }: {
    classGroupId: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: ClassListResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getClassList({
          classGroupId,
        }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
    success,
    reset,
  }
}
