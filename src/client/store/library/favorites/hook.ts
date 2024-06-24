import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibraryFavorite, useLibraryFavoriteAction } from './selector'

export function useOnLoadLibraryFavorite() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibraryFavoriteAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const option = {
        status: 'All',
        page: 1,
      }
      const res = await fetcher.response(repository.getFavorite(option))

      if (res.isSuccess) {
        action.setFavorite(option, res.payload)
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

export function useFetchLibraryFavorite() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibraryFavoriteAction()
  const option = useLibraryFavorite().option

  const fetch = ({
    status,
    page = 1,
    callback,
  }: {
    status: string
    page?: number
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)
      const newOption = { status, page }
      action.setFavorite(newOption)
      const res = await fetcher.response(
        repository.getFavorite({ page, status }),
      )
      if (res.isSuccess) {
        action.setFavorite(newOption, res.payload)
        callback && callback({ loading: false, success: true })
      } else {
        action.setFavorite(option)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
          })
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

export function useFetchLibraryDeleteFavorite() {
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
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)
      callback && callback({ loading: true })

      const res = await fetcher.response(
        repository.deleteFavorite({ levelRoundIds }),
      )
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

export function useFetchLibraryAddFavroite() {
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
      error?: unknown
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      callback && callback({ loading: true })
      setLoading(true)

      const res = await fetcher.response(
        repository.postFavoriteAdd({ levelRoundIds }),
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
