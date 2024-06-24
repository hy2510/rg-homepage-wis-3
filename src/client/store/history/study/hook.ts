import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import { useHistoryStudy, useHistoryStudyAction } from './selector'
import { fetcher } from '../../fetcher-action'
import repository from '@/repository/client'

export function useOnLoadStudyReport() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useHistoryStudyAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const range = 30
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - range)
      const endDate = new Date()

      const startDateOption = {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }
      const endDateOption = {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }
      const option = {
        range,
        startDate: `${startDateOption.year}${
          startDateOption.month > 9
            ? startDateOption.month
            : `0${startDateOption.month}`
        }${
          startDateOption.day > 9
            ? startDateOption.day
            : `0${startDateOption.day}`
        }`,
        endDate: `${endDateOption.year}${
          endDateOption.month > 9
            ? endDateOption.month
            : `0${endDateOption.month}`
        }${
          endDateOption.day > 9 ? endDateOption.day : `0${endDateOption.day}`
        }`,
        status: 'All',
      }
      const res = await fetcher.response(repository.getStudyReport(option))

      if (res.isSuccess) {
        action.setStudyHistoryBasic(
          {
            startDate: startDateOption,
            endDate: endDateOption,
            status: option.status,
          },
          res.payload
        )
        action.setStudyHistorySimple(
          {
            range,
            status: option.status,
          },
          res.payload
        )
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

export function useFetchStudyReportRange() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useHistoryStudyAction()
  const { option } = useHistoryStudy().simple

  const fetch = ({ range, status }: { range: 7 | 14 | 30; status: string }) => {
    async function fetching() {
      setLoading(true)

      const startDate = new Date()
      startDate.setDate(startDate.getDate() - range)
      const endDate = new Date()

      const startDateOption = {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }
      const endDateOption = {
        range,
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }
      const newOption = {
        startDate: `${startDateOption.year}${
          startDateOption.month > 9
            ? startDateOption.month
            : `0${startDateOption.month}`
        }${
          startDateOption.day > 9
            ? startDateOption.day
            : `0${startDateOption.day}`
        }`,
        endDate: `${endDateOption.year}${
          endDateOption.month > 9
            ? endDateOption.month
            : `0${endDateOption.month}`
        }${
          endDateOption.day > 9 ? endDateOption.day : `0${endDateOption.day}`
        }`,
        status,
      }
      const res = await fetcher.response(repository.getStudyReport(newOption))

      if (res.isSuccess) {
        action.setStudyHistorySimple(
          {
            range,
            status: newOption.status,
          },
          res.payload
        )
      } else {
        action.setStudyHistorySimple(option)
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

export function useFetchStudyReport() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useHistoryStudyAction()
  const { option } = useHistoryStudy().basic

  const fetch = ({
    startDate: inStartDate,
    endDate: inEndDate,
    keyword: inKeyword,
    status,
  }: {
    startDate: { year: number; month: number; day: number }
    endDate: { year: number; month: number; day: number }
    keyword?: string
    status: string
  }) => {
    async function fetching() {
      setLoading(true)

      const startDate = new Date(
        inStartDate.year,
        inStartDate.month - 1,
        inStartDate.day
      )
      const endDate = new Date(
        inEndDate.year,
        inEndDate.month - 1,
        inEndDate.day
      )

      const startDateOption = {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }
      const endDateOption = {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }
      const newOption = {
        startDate: `${startDateOption.year}${
          startDateOption.month > 9
            ? startDateOption.month
            : `0${startDateOption.month}`
        }${
          startDateOption.day > 9
            ? startDateOption.day
            : `0${startDateOption.day}`
        }`,
        endDate: `${endDateOption.year}${
          endDateOption.month > 9
            ? endDateOption.month
            : `0${endDateOption.month}`
        }${
          endDateOption.day > 9 ? endDateOption.day : `0${endDateOption.day}`
        }`,
        status,
      }

      let promise
      if (inKeyword) {
        promise = repository.getStudyReportSearch({
          ...newOption,
          keyword: inKeyword,
        })
      } else {
        promise = repository.getStudyReport(newOption)
      }
      const res = await fetcher.response(promise)

      if (res.isSuccess) {
        action.setStudyHistoryBasic(
          {
            startDate: startDateOption,
            endDate: endDateOption,
            status: newOption.status,
            keyword: inKeyword ? inKeyword : undefined,
          },
          res.payload
        )
      } else {
        action.setStudyHistoryBasic(option)
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
