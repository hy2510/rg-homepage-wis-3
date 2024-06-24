import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentAvatarAction } from './selector'

export function useOnLoadStudentAvatar() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setAvatar } = useStudentAvatarAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getStudentAvatarList())

      if (res.isSuccess) {
        setAvatar(res.payload?.avatarId, res.payload)
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

export function useFetchSetStudentAvatar() {
  const { loading, setLoading, error, setError, success, setSuccess } =
    useFetchBasicState()
  const { changeAvatar } = useStudentAvatarAction()

  const fetch = (avatarId: string) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.putStudentAvatarUpdate({ avatarId }),
      )

      if (res.isSuccess) {
        changeAvatar(avatarId)
        setSuccess(true)
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
    success,
  }
}
