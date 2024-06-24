import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useAchieveReadingKingTrophyAction } from './selector'

export function useOnLoadReadingKingTrophy() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setReadingKingTrophy } = useAchieveReadingKingTrophyAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getReadingKingTrophy())

      if (res.isSuccess) {
        setReadingKingTrophy(res.payload)
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

export function useFetchReadingKingTrophy() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setReadingKingTrophy } = useAchieveReadingKingTrophyAction()

  const fetch = () => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getReadingKingTrophy())

      if (res.isSuccess) {
        setReadingKingTrophy(res.payload)
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
