import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useAchieveSuccessiveDailyGoalAction } from './selector'

export function useOnLoadSuccessiveDailyGoal() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setSuccessiveDailyGoal } = useAchieveSuccessiveDailyGoalAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getSuccessiveDailyGoal())

      if (res.isSuccess) {
        setSuccessiveDailyGoal(res.payload)
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

export function useFetchSuccessiveStudy() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setSuccessiveDailyGoal } = useAchieveSuccessiveDailyGoalAction()

  const fetch = () => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getSuccessiveDailyGoal())

      if (res.isSuccess) {
        setSuccessiveDailyGoal(res.payload)
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
