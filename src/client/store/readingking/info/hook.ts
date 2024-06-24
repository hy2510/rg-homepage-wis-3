import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useReadingkingInfoAction } from './selector'

export function useFetchReadingkingEvent() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setInfo } = useReadingkingInfoAction()

  const fetch = (eventId: string) => {
    async function fetching() {
      setLoading(true)

      const promise = Promise.all([
        fetcher.response(repository.getReadingKingEventDetail({ eventId })),
        fetcher.response(repository.getReadingKingEventPrizeList({ eventId })),
      ])
      let res = await promise
      let isSuccess = true
      let error: any = undefined
      for (let i = 0; i < res.length; i++) {
        if (!res[i].isSuccess) {
          isSuccess = false
          error = res[i].error
        }
      }
      if (isSuccess) {
        setInfo({ eventId }, res[0].payload, res[1].payload)
      } else {
        setError(error)
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

export function useFetchReadingkingPrize() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setEventPrize } = useReadingkingInfoAction()

  const fetch = ({
    eventId,
    eventPrizeId,
  }: {
    eventId: string
    eventPrizeId: string
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getReadingKingEventSet({
          eventId,
          eventPrizeId,
        }),
      )

      if (res.isSuccess) {
        setEventPrize(eventPrizeId)
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
