import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import { useStudentTodayStudyAction } from './selector'
import { fetcher } from '../../fetcher-action'
import repository from '@/repository/client'

export function useOnLoadStudentTodayStudy() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useStudentTodayStudyAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getTodayStudyLearning())

      if (res.isSuccess) {
        action.setTodayStudyLearning(res.payload)
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

export function useFetchStudentTodayStudy() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useStudentTodayStudyAction()

  const fetch = () => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getTodayStudyLearning())

      if (res.isSuccess) {
        action.setTodayStudyLearning(res.payload)
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
