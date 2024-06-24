import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useOnLoadAttendance() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.putAttendance({
          deviceType: 'TEST_DEVICE',
          mobileYn: 'N', //isMobile ? 'Y' : 'N',
        }),
      )

      if (res.isSuccess) {
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
  }
}

export function useFetchAttendance() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    deviceType,
    isMobile,
    callback,
  }: {
    deviceType: string
    isMobile: boolean
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.putAttendance({
          deviceType,
          mobileYn: isMobile ? 'Y' : 'N',
        }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false

        callback && callback(success)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}
