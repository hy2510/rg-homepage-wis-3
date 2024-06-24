import { useCallback, useState } from 'react'

export const useFetchBasicState = (defaultLoading?: boolean) => {
  const [loading, setLoading] = useState(!!defaultLoading)
  const [error, setError] = useState<any>(undefined)
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const reset = useCallback(() => {
    setError(undefined)
    setSuccess(undefined)
  }, [])
  return { loading, setLoading, error, setError, success, setSuccess, reset }
}
