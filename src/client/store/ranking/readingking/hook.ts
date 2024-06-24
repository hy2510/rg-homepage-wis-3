import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useReadingkingEvent } from '../../readingking/event/selector'
import { useStudentIsLogin } from '../../student/info/selector'
import { useReadingkingRankingAction } from './selector'

export function useOnLoadReadkingkingRanking() {
  const isLogin = useStudentIsLogin()
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useReadingkingRankingAction()

  const events = useReadingkingEvent().payload
  const eventId = events && events.length > 0 ? events[0].eventId : ''
  useEffect(() => {
    if (eventId) {
      const fetching = async () => {
        setLoading(true)
        const option = {
          eventId,
        }
        const res = await fetcher.response(
          repository.getRankingReadingking({
            ...option,
            isLogin,
          }),
        )

        if (res.isSuccess) {
          action.setReadingking(option, res.payload)
        } else {
          setError(res.error)
        }

        setLoading(false)
      }
      fetching()
    }
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  return {
    loading,
    error,
  }
}

export function useFetchReadkingkingRanking() {
  const isLogin = useStudentIsLogin()

  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useReadingkingRankingAction()

  const fetch = ({ eventId: inEventId }: { eventId: string }) => {
    async function fetching() {
      setLoading(true)

      const newOption = {
        eventId: inEventId,
      }
      const res = await fetcher.response(
        repository.getRankingReadingking({
          ...newOption,
          isLogin,
        }),
      )

      if (res.isSuccess) {
        action.setReadingking(newOption, res.payload)
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
