import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useEffect } from 'react'
import {
  useLibraryEbPbFilter,
  useLibraryFilterAction,
} from '../filter/selector'
import { useLibraryLevel, useLibraryLevelAction } from './selector'

export function useOnLoadLibraryLevel({
  level,
  bookType,
  sort = '',
  genre = '',
  status = '',
}: {
  level: string
  bookType: string
  sort: string
  genre: string
  status: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setLibraryLevel } = useLibraryLevelAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const option = {
        level,
        bookType,
        sort,
        genre,
        status,
        page: 1,
      }
      const res = await fetcher.response(repository.getSearchLevelBook(option))

      if (res.isSuccess) {
        setLibraryLevel(option, res.payload)
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

export function useFetchLibraryLevel() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setLibraryLevel } = useLibraryLevelAction()
  const { option } = useLibraryLevel()
  const { setEbPbFilter } = useLibraryFilterAction()

  const ebFilter = useLibraryEbPbFilter('EB')
  const pbFilter = useLibraryEbPbFilter('PB')

  const fetch = ({
    level: inLevel,
    page: inPage,
    sort: inSort,
    genre: inGenre,
    status: inStatus,
  }: {
    level?: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  }) => {
    async function fetching() {
      setLoading(true)
      const targetLevel = inLevel || option.level
      const bookType = option.bookType as 'EB' | 'PB'
      const filter = bookType === 'EB' ? ebFilter : pbFilter
      const sort = inSort || filter.sort
      const genre = inGenre || filter.genre
      const status = inStatus || filter.status
      const isReloadPage =
        targetLevel !== option.level ||
        sort !== filter.sort ||
        status !== filter.status ||
        genre !== filter.genre
      const page = isReloadPage ? 1 : inPage || option.page

      const newOption = {
        level: targetLevel,
        bookType,
        page,
        sort,
        status,
        genre,
      }
      const res = await fetcher.response(
        repository.getSearchLevelBook(newOption)
      )
      if (res.isSuccess) {
        setLibraryLevel(
          {
            level: targetLevel,
            bookType,
            page,
          },
          res.payload
        )
        if (bookType === 'EB') {
          setEbPbFilter('EB', { sort, status, genre })
        } else {
          setEbPbFilter('PB', { sort, status, genre })
        }
      } else {
        setLibraryLevel(option)
        if (bookType === 'EB') {
          setEbPbFilter('EB', ebFilter)
        } else {
          setEbPbFilter('PB', pbFilter)
        }
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
