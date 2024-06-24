import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibraryTryAgain, useLibraryTryAgainAction } from './selector'

export function useOnLoadLibraryTryAgain() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibraryTryAgainAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const option = {
        page: 1,
      }
      const res = await fetcher.response(repository.getSearchTryAgain(option))

      if (res.isSuccess) {
        action.setTryAgain(option, res.payload)
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

export function useFetchLibraryTryAgain() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibraryTryAgainAction()
  const _page = useLibraryTryAgain().option.page

  const fetch = ({ page = 1 }: { page?: number }) => {
    async function fetching() {
      setLoading(true)
      const newOption = { page }
      const res = await fetcher.response(
        repository.getSearchTryAgain(newOption),
      )
      if (res.isSuccess) {
        action.setTryAgain(newOption, res.payload)
      } else {
        action.setTryAgain({ page: _page })
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
