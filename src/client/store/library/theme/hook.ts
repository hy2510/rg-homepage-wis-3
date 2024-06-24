import { useEffect } from 'react'
import { useFetchBasicState } from '../../hooks'
import { fetcher } from '../../fetcher-action'
import repository from '@/repository/client'
import {
  useLibraryEbPbFilter,
  useLibraryFilterAction,
} from '../filter/selector'
import { useLibraryTheme, useLibraryThemeAction } from './selector'

export function useOnLoadLibraryTheme() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibraryThemeAction()

  const option = useLibraryTheme().option
  const bookType = option.bookType as 'EB' | 'PB'
  const { level, keyword } = option
  const filter = useLibraryEbPbFilter(bookType)

  useEffect(() => {
    async function fetching() {
      if (!level) {
        setError('level ERROR')
        return
      }
      if (!bookType) {
        setError('bookType ERROR')
        return
      }
      if (!keyword) {
        setError('series Name ERROR')
        return
      }
      setLoading(true)

      const { sort, status, genre } = filter
      const option = {
        level,
        bookType,
        keyword,
        sort,
        status,
        genre,
        page: 1,
      }
      const res = await fetcher.response(repository.getSearchThemeBook(option))

      if (res.isSuccess) {
        action.setThemeSearch(undefined, res.payload)
      } else {
        setError(error)
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

export function useFetchLibraryTheme() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibraryThemeAction()
  const option = useLibraryTheme().option
  const bookType = option.bookType as 'EB' | 'PB'
  const filter = useLibraryEbPbFilter(bookType)
  const { setEbPbFilter } = useLibraryFilterAction()

  const fetch = ({
    sort: inSort,
    status: inStatus,
    genre: inGenre,
    page: inPage = 1,
  }: {
    sort?: string
    status?: string
    genre?: string
    page: number
  }) => {
    async function fetching() {
      setLoading(true)

      const newOption = {
        ...option,
        page: inPage || 1,
      }
      const { sort, status, genre } = filter
      const newFilter = {
        sort: inSort || sort,
        status: inStatus || status,
        genre: inGenre || genre,
      }
      const res = await fetcher.response(
        repository.getSearchThemeBook({
          bookType: option.bookType,
          level: option.level,
          keyword: option.keyword,
          page: inPage || 1,
          ...newFilter,
        })
      )
      if (res.isSuccess) {
        action.setThemeSearch(newOption, res.payload)
        setEbPbFilter(bookType, newFilter)
      } else {
        setEbPbFilter(bookType, { sort, status, genre })
        action.setThemeSearch(option)
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
