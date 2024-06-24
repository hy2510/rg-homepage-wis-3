import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import { fetcher } from '../../fetcher-action'
import repository from '@/repository/client'
import { useCalendarAttend, useCalendarAttendAction } from './selector'

export function useOnLoadAttendCalendar() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useCalendarAttendAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const date = new Date()
      const option = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      }
      const res = await fetcher.response(repository.getAttendCalendar(option))

      if (res.isSuccess) {
        action.setAttend(option, res.payload)
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

export function useFetchAttendCalendar() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useCalendarAttendAction()
  const option = useCalendarAttend().option

  const fetch = ({ year, month }: { year: number; month: number }) => {
    async function fetching() {
      setLoading(true)
      const newOption = { year, month }
      action.setAttend(newOption)
      const res = await fetcher.response(
        repository.getAttendCalendar(newOption)
      )

      if (res.isSuccess) {
        action.setAttend(newOption, res.payload)
      } else {
        action.setAttend(option)
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
