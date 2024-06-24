import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibraryTodo, useLibraryTodoAction } from './selector'

export function useOnLoadLibraryTodo() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibraryTodoAction()
  const todo = useLibraryTodo()

  const todoCount = todo.count

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const option = {
        sortOption: 'RegistDate',
        page: 1,
      }
      const res = await fetcher.response(repository.getTodo(option))

      if (res.isSuccess) {
        action.setTodo(option, res.payload)
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

export function useFetchLibraryTodos() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibraryTodoAction()
  const { option } = useLibraryTodo()

  const fetch = ({
    sortOption,
    page = 1,
    isReload,
    callback,
  }: {
    sortOption?: string
    page?: number
    isReload?: boolean
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      const newSortColumn = sortOption || 'RegistDate'
      setLoading(true)
      if (newSortColumn === option.sortOption && !isReload) {
        action.setTodo({ sortOption: option.sortOption, page })
      } else {
        const res = await fetcher.response(
          repository.getTodo({ sortColumn: newSortColumn }),
        )
        if (res.isSuccess) {
          callback && callback({ loading: false, success: true })
          action.setTodo({ sortOption: newSortColumn, page }, res.payload)
        } else {
          action.setTodo(option)
          callback &&
            callback({
              loading: false,
              success: false,
              error: res.error,
            })
          setError(res.error)
        }
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

export function useFetchLibraryAddTodo() {
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
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)
      callback && callback({ loading: true })

      const res = await fetcher.response(
        repository.postTodoAdd({ levelRoundIds, studentHistoryId }),
      )
      if (res.isSuccess) {
        setSuccess(true)
        callback && callback({ loading: false, success: true, reset })
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

export function useFetchLibraryDeleteTodo() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    studyIds,
    callback,
  }: {
    studyIds: string[]
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

      const res = await fetcher.response(repository.deleteTodo({ studyIds }))
      if (res.isSuccess) {
        setSuccess(true)
        callback && callback({ loading: false, success: true, reset })
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
