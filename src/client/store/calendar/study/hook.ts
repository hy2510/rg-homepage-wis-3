import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import { fetcher } from '../../fetcher-action'
import repository from '@/repository/client'
import { useCalendarStudy, useCalendarStudyAction } from './selector'

export function useOnLoadStudyCalendar() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useCalendarStudyAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const date = new Date()
      const option = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      }
      const res = await fetcher.response(repository.getStudyCalendar(option))

      if (res.isSuccess) {
        action.setStudyCalendar(option, res.payload)
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

export function useFetchStudyCalendar() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useCalendarStudyAction()
  const option = useCalendarStudy().option

  const fetch = ({ year, month }: { year: number; month: number }) => {
    async function fetching() {
      setLoading(true)
      const newOption = { year, month }
      action.setStudyCalendar(newOption)
      const res = await fetcher.response(repository.getStudyCalendar(newOption))

      if (res.isSuccess) {
        action.setStudyCalendar(newOption, res.payload)
      } else {
        action.setStudyCalendar(option)
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
