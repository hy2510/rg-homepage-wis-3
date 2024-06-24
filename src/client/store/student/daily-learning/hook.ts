import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import repository from '@/repository/client'
import { useStudentDailyLearningAction } from './selector'
import { fetcher } from '../../fetcher-action'

export function useOnLoadStudentDailyLearning() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setDailyLearning } = useStudentDailyLearningAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getStudentDailyLearning())

      if (res.isSuccess) {
        setDailyLearning(res.payload)
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

export function useFetchSetStudentDailyLearning() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()
  const { changeDailyLearning, addDailyLearningHistory } =
    useStudentDailyLearningAction()

  const fetch = (level: string, type: string, value: number) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.putStudentDailyLearningSave({ type, level, value })
      )

      if (res.isSuccess) {
        changeDailyLearning(type, value)
        const today = new Date()
        const date = `${today.getFullYear()}-${
          today.getMonth() < 9
            ? `0${today.getMonth() + 1}`
            : today.getMonth() + 1
        }-${today.getDate() <= 9 ? `0${today.getDate()}` : today.getDate()}`
        addDailyLearningHistory(date, type, value)
        setSuccess(true)
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
    success,
    reset,
  }
}

export function useFetchSetStudentDailyLearningLevel() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()
  const { changeDailyLearningLevel } = useStudentDailyLearningAction()

  const fetch = (level: string) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.putStudentDailyLearningSaveLevel({ level })
      )

      if (res.isSuccess) {
        setSuccess(true)
        changeDailyLearningLevel(level)
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
    success,
    reset,
  }
}

export function useOnLoadStudentDailyLearningHistory() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setDailyLearningHistory } = useStudentDailyLearningAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getStudentDailyLearningHistory()
      )

      if (res.isSuccess) {
        setDailyLearningHistory(res.payload)
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
