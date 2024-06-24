import { useEffect, useState } from 'react'
import repository from '@/repository/client'
import {
  LevelMasterBoardResponse,
  newLevelMasterBoard,
} from '@/repository/client/ranking/level-master'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useOnLoadLevelMasterBoard() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [payload, setPayload] = useState<LevelMasterBoardResponse>(
    newLevelMasterBoard(),
  )

  useEffect(() => {
    const fetching = async () => {
      setLoading(true)
      const res = await fetcher.response(repository.getLevelMasterBoard())

      if (res.isSuccess && res.payload) {
        setPayload(res.payload)
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
    payload,
  }
}
