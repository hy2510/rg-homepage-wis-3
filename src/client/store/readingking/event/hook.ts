import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import { useReadingkingEventAction } from './selector'
import { fetcher } from '../../fetcher-action'
import repository from '@/repository/client'
import { useReadingkingInfoAction } from '../info/selector'

export function useOnLoadReadingkingEvent() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setEvent } = useReadingkingEventAction()
  const { setInfo } = useReadingkingInfoAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getReadingKingEventList())

      if (res.isSuccess) {
        setEvent(res.payload)
        if (res.payload && res.payload.length > 0) {
          const eventId = res.payload[0].eventId
          const promise = Promise.all([
            fetcher.response(repository.getReadingKingEventDetail({ eventId })),
            fetcher.response(
              repository.getReadingKingEventPrizeList({ eventId })
            ),
          ])
          let res2 = await promise
          let isSuccess = true
          let error: any = undefined
          for (let i = 0; i < res2.length; i++) {
            if (!res2[i].isSuccess) {
              isSuccess = false
              error = res2[i].error
            }
          }
          if (isSuccess) {
            setInfo({ eventId }, res2[0].payload, res2[1].payload)
          } else {
            setError(error)
          }
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
  }
}
