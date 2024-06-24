import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentIsLogin } from '../../student/info/selector'
import { usePointRankingAction } from './selector'

export function useOnLoadPointRankingMonthly() {
  const isLogin = useStudentIsLogin()

  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = usePointRankingAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getRankingPoint({
          type: 'monthly',
          isLogin,
        }),
      )

      if (res.isSuccess) {
        action.setMonthlyRanking(res.payload)
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

export function useOnLoadPointRankingTotal() {
  const isLogin = useStudentIsLogin()

  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = usePointRankingAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getRankingPoint({
          type: 'total',
          isLogin,
        }),
      )

      if (res.isSuccess) {
        action.setTotalRanking(res.payload)
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
