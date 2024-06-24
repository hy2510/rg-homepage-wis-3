import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useHistoryStudy, useHistoryStudyAction } from '../study/selector'
import { useHistorySpeak, useHistorySpeakAction } from './selector'

export function useOnLoadSpeakReport() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useHistorySpeakAction()

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
        range,
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }
      const option = {
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
      const res = await fetcher.response(repository.getSpeakingReport(option))

      if (res.isSuccess) {
        action.setSpeakHistory(
          {
            range,
            startDate: startDateOption,
            endDate: endDateOption,
            status: option.status,
          },
          res.payload,
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

export function useFetchSpeakReportRange() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useHistorySpeakAction()
  const { option } = useHistorySpeak()

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
      const res = await fetcher.response(
        repository.getSpeakingReport(newOption),
      )

      if (res.isSuccess) {
        action.setSpeakHistory(
          {
            range,
            startDate: startDateOption,
            endDate: endDateOption,
            status: newOption.status,
          },
          res.payload,
        )
      } else {
        action.setSpeakHistory(option)
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

export function useFetchSpeakReport() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useHistorySpeakAction()
  const { option } = useHistorySpeak()
  const studyAction = useHistoryStudyAction()
  const { option: studyOption } = useHistoryStudy().basic

  const fetch = ({
    startDate: inStartDate,
    endDate: inEndDate,
    status,
    isSyncStudyDate,
  }: {
    startDate: { year: number; month: number; day: number }
    endDate: { year: number; month: number; day: number }
    status: string
    isSyncStudyDate?: boolean
  }) => {
    async function fetching() {
      setLoading(true)

      const range = 0
      const startDate = new Date(
        inStartDate.year,
        inStartDate.month - 1,
        inStartDate.day,
      )
      const endDate = new Date(
        inEndDate.year,
        inEndDate.month - 1,
        inEndDate.day,
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
        range,
        status,
      }
      const res = await fetcher.response(
        repository.getSpeakingReport(newOption),
      )

      if (res.isSuccess) {
        action.setSpeakHistory(
          {
            range,
            startDate: startDateOption,
            endDate: endDateOption,
            status: newOption.status,
          },
          res.payload,
        )
        if (isSyncStudyDate) {
          studyAction.setStudyHistoryBasic({
            startDate: startDateOption,
            endDate: endDateOption,
            keyword: studyOption.keyword,
            status: studyOption.status,
          })
        }
      } else {
        action.setSpeakHistory(option)
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
