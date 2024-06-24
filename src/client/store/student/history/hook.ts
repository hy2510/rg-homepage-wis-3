import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentHistoryAction } from './selector'

export function useOnLoadStudentHistory() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setHistory, setDefaultHistoryId } = useStudentHistoryAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getStudentHistoryList())

      if (res.isSuccess) {
        if (res.payload && res.payload?.length > 0) {
          setDefaultHistoryId(res.payload[0].studentHistoryId)
        }
        setHistory(res.payload)
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

export function useFetchStudentHistory() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setHistory } = useStudentHistoryAction()

  const fetch = () => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getStudentHistoryList())

      if (res.isSuccess) {
        setHistory(res.payload)
      } else {
        setError(res.error)
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
