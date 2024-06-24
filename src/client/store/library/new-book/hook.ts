import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import { fetcher } from '../../fetcher-action'
import repository from '@/repository/client'
import { useLibraryNewBook, useLibraryNewBookAction } from './selector'

export function useOnLoadLibraryNewBook() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibraryNewBookAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1

      const res = await fetcher.response(
        repository.getNewBooks({ year, month })
      )

      if (res.isSuccess) {
        action.setNewBooks({ year, month }, res.payload)
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

export function useFetchLibraryNewBook() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibraryNewBookAction()
  const option = useLibraryNewBook().option

  const fetch = ({
    year: inYear,
    month: inMonth,
  }: {
    year?: number
    month?: number
  }) => {
    async function fetching() {
      setLoading(true)
      const now = new Date()
      const year = inYear || now.getFullYear()
      const month = inMonth || now.getMonth() + 1

      const newOption = { year, month }
      action.setNewBooks(newOption)
      const res = await fetcher.response(
        repository.getNewBooks({ year, month })
      )
      if (res.isSuccess) {
        action.setNewBooks(
          {
            year,
            month,
          },
          res.payload
        )
      } else {
        action.setNewBooks({ year: option.year, month: option.month })
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
