import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import {
  useLibraryEbPbFilter,
  useLibraryFilterAction,
} from '../filter/selector'
import { useLibrarySeries, useLibrarySeriesAction } from './selector'

export function useOnLoadLibrarySeries() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibrarySeriesAction()
  const option = useLibrarySeries().option
  const bookType = option.bookType as 'EB' | 'PB'
  const { level, title } = option

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
      if (!title) {
        setError('series Name ERROR')
        return
      }
      setLoading(true)

      const { sort, status, genre } = filter

      const option = {
        level,
        bookType,
        keyword: title,
        sort,
        status,
        genre,
        page: 1,
      }
      const res = await fetcher.response(repository.getSearchSeriesBook(option))

      if (res.isSuccess) {
        action.setSeriesSearch(undefined, res.payload)
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

export function useFetchLibrarySeries() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibrarySeriesAction()
  const option = useLibrarySeries().option
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
        repository.getSearchSeriesBook({
          bookType: option.bookType,
          level: option.level,
          keyword: option.title,
          page: inPage || 1,
          ...newFilter,
        }),
      )
      if (res.isSuccess) {
        action.setSeriesSearch(newOption, res.payload)
        setEbPbFilter(bookType, newFilter)
      } else {
        action.setSeriesSearch(option)
        setEbPbFilter(bookType, { sort, genre, status })
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
