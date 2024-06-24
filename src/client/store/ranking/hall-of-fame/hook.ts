import { useEffect, useState } from 'react'
import repository from '@/repository/client'
import {
  HallOfFameResponse,
  newHallOfFame,
} from '@/repository/client/ranking/hall-of-fame'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentIsLogin } from '../../student/info/selector'

export function useOnLoadHallOfFame() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [payload, setPayload] = useState<HallOfFameResponse>(newHallOfFame())

  const isLogin = useStudentIsLogin()

  useEffect(() => {
    const fetching = async () => {
      setLoading(true)
      const res = await fetcher.response(repository.getHallOfFame({ isLogin }))

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
