import { useEffect } from 'react'
import repository from '@/repository/client'
import { BookInfoResponse } from '@/repository/client/library/book-info/book-info'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useBookInfoDetailAction } from './selector'

export function useOnLoadBookInfoDetail(option: {
  levelRoundId: string
  studyId?: string
  studentHistoryId?: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useBookInfoDetailAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getBookInfo(option))

      if (res.isSuccess) {
        action.setBookDetail(undefined, res.payload)
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

export function useFetchBookInfoDetail() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()
  const action = useBookInfoDetailAction()

  const fetch = ({
    levelRoundId,
    studyId,
    studentHistoryId,
    callback,
  }: {
    levelRoundId: string
    studyId?: string
    studentHistoryId?: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: BookInfoResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)
      callback && callback({ loading: true })

      const res = await fetcher.response(
        repository.getBookInfo({
          levelRoundId,
          studyId,
          studentHistoryId,
        }),
      )

      if (res.isSuccess) {
        action.setBookDetail(undefined, res.payload)
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback && callback({ loading: false, success: false, error, reset })
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

export function useFetchStudyMode() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    classId,
    levelRoundId,
    studyId,
    studentHistoryId,
    mode,
    callback,
  }: {
    classId: string
    levelRoundId: string
    studyId: string
    studentHistoryId: string
    mode: 'full' | 'easy'
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)
      callback && callback({ loading: true })

      const res = await fetcher.response(
        repository.postStudyMode({
          classId,
          levelRoundId,
          studyId,
          studentHistoryId,
          mode,
        }),
      )

      if (res.isSuccess && res.payload && res.payload.success) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            reset,
          })
      } else {
        setError(res.error)
        callback && callback({ loading: false, success: false, error, reset })
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
