import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useFetchExportBookListUrl() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    levelRoundIds,
    callback,
  }: {
    levelRoundIds: string[]
    callback?: (data: {
      loading: boolean
      success?: boolean
      payload?: string
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)
      callback && callback({ loading: true })

      const res = await fetcher.response(
        repository.getExportBookList({ levelRoundIds }),
      )
      if (res.isSuccess) {
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
        callback &&
          callback({ loading: false, success: false, error: res.error, reset })
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

export function useFetchExportVocabularyUrl() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    levelRoundIds,
    studentHistoryId,
    callback,
  }: {
    levelRoundIds: string[]
    studentHistoryId: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      payload?: string
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)
      callback && callback({ loading: true })

      const res = await fetcher.response(
        repository.getExportVocabulary({ levelRoundIds, studentHistoryId }),
      )
      if (res.isSuccess) {
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
        callback &&
          callback({ loading: false, success: false, error: res.error, reset })
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

export function useFetchExportStudentReportUrl() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    studyIds,
    studentHistoryIds,
    callback,
  }: {
    studyIds: string[]
    studentHistoryIds: string[]
    callback?: (data: {
      loading: boolean
      success?: boolean
      payload?: string
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)
      callback && callback({ loading: true })

      const res = await fetcher.response(
        repository.getExportStudentReport({ studyIds, studentHistoryIds }),
      )
      if (res.isSuccess) {
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
        callback &&
          callback({ loading: false, success: false, error: res.error, reset })
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
