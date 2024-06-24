import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useEffect } from 'react'
import {
  useLibraryEbPbFilter,
  useLibraryFilterAction,
} from '../filter/selector'
import { useLibraryMovie, useLibraryMovieAction } from './selector'

export function useOnLoadLibraryMovie({
  level,
  sort = '',
  genre = '',
  status = '',
}: {
  level: string
  sort: string
  genre: string
  status: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setLibraryMovie } = useLibraryMovieAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const option = {
        level,
        sort,
        genre,
        status,
        page: 1,
      }
      const res = await fetcher.response(repository.getSearchMovieBook(option))

      if (res.isSuccess) {
        setLibraryMovie(option, res.payload)
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

export function useFetchLibraryMovie() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setLibraryMovie } = useLibraryMovieAction()
  const { option } = useLibraryMovie()
  const { setEbPbFilter } = useLibraryFilterAction()

  const ebFilter = useLibraryEbPbFilter('EB')

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
      const filter = ebFilter
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
        page,
        sort,
        status,
        genre,
      }
      const res = await fetcher.response(
        repository.getSearchMovieBook(newOption)
      )
      if (res.isSuccess) {
        setLibraryMovie(
          {
            level: targetLevel,
            page,
          },
          res.payload
        )
        setEbPbFilter('EB', { sort, status, genre })
      } else {
        setLibraryMovie(option)
        setEbPbFilter('EB', ebFilter)
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
