import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import {
  useLibraryDodoAbcLevel,
  useLibraryDodoAbcLevelAction,
} from './selector'

export function useOnLoadLibraryLevelDodoAbc({
  activity = 'Study-Alphabet',
  status = 'All',
}: {
  activity?: string
  status?: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setLibraryDodoAbc } = useLibraryDodoAbcLevelAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const option = {
        activity,
        status,
        page: 1,
      }
      const res = await fetcher.response(
        repository.getSearchDodoABCBook(option),
      )

      if (res.isSuccess) {
        setLibraryDodoAbc(option, res.payload)
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

export function useFetchLibraryLevelDodoAbc() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setLibraryDodoAbc } = useLibraryDodoAbcLevelAction()

  const option = useLibraryDodoAbcLevel().option

  const fetch = ({
    activity: inActivity,
    page: inPage,
    status: inStatus,
  }: {
    activity?: string
    page?: number
    status?: string
  }) => {
    async function fetching() {
      setLoading(true)
      const activity = inActivity || option.activity
      const status = inStatus || option.status
      const page = inPage || 1

      const newOption = {
        activity,
        status,
        page,
      }
      const res = await fetcher.response(
        repository.getSearchDodoABCBook(newOption),
      )
      if (res.isSuccess) {
        setLibraryDodoAbc(newOption, res.payload)
      } else {
        setLibraryDodoAbc(option)
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
