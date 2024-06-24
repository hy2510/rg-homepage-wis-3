import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibrarySearchAction } from './selector'

export function useOnLoadLibrarySearchKeyword(keyword: string) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibrarySearchAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)

      const res = await Promise.all([
        fetcher.response(
          repository.getSearchKeywordBook({
            keyword,
            bookType: 'EB',
            page: 1,
          }),
        ),
        fetcher.response(
          repository.getSearchKeywordBook({
            keyword,
            bookType: 'PB',
            page: 1,
          }),
        ),
      ])

      let isSuccess = true
      let error: any = undefined
      for (let i = 0; i < res.length; i++) {
        if (!res[i].isSuccess) {
          isSuccess = false
          error = res[i].error
        }
      }
      if (isSuccess) {
        action.setKeywordSearch('EB', { keyword, page: 1 }, res[0].payload)
        action.setKeywordSearch('PB', { keyword, page: 1 }, res[1].payload)
      } else {
        setError(error)
      }
      setLoading(false)
    }
    if (keyword) {
      fetching()
    } else {
      setError('Keyword is Null.')
    }
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
  }
}

export function useOnClearLibrarySearchKeyword(keyword: string) {
  const action = useLibrarySearchAction()
  useEffect(() => {
    action.setClearKeywordSearch()
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])
}

export function useFetchLibrarySearchKeywordFirst() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibrarySearchAction()

  const fetch = (keyword: string) => {
    async function fetching() {
      setLoading(true)

      const res = await Promise.all([
        fetcher.response(
          repository.getSearchKeywordBook({
            keyword,
            bookType: 'EB',
            page: 1,
          }),
        ),
        fetcher.response(
          repository.getSearchKeywordBook({
            keyword,
            bookType: 'PB',
            page: 1,
          }),
        ),
      ])

      let isSuccess = true
      let error: any = undefined
      for (let i = 0; i < res.length; i++) {
        if (!res[i].isSuccess) {
          isSuccess = false
          error = res[i].error
        }
      }
      if (isSuccess) {
        action.setKeywordSearch('EB', { keyword, page: 1 }, res[0].payload)
        action.setKeywordSearch('PB', { keyword, page: 1 }, res[1].payload)
      } else {
        setError(error)
      }
      setLoading(false)
    }
    if (keyword) {
      fetching()
    } else {
      setError('Keyword is Null.')
    }
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchLibrarySearchKeyword() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibrarySearchAction()

  const fetch = ({
    bookType: inBookType,
    keyword: inKeyword,
    page: inPage = 1,
  }: {
    bookType: string
    keyword: string
    page: number
  }) => {
    async function fetching() {
      setLoading(true)

      const newOption = {
        bookType: inBookType,
        keyword: inKeyword,
        page: inPage,
      }
      const res = await fetcher.response(
        repository.getSearchKeywordBook(newOption),
      )
      if (res.isSuccess) {
        action.setKeywordSearch(
          inBookType,
          {
            keyword: inKeyword,
            page: inPage,
          },
          res.payload,
        )
      } else {
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
