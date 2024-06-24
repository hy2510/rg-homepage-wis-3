import { useEffect, useState } from 'react'
import repository from '@/repository/client'
import {
  BoardNoticeResponse,
  newBoardNotice,
} from '@/repository/client/home/board-notice-detail'
import {
  BoardNoticeListResponse,
  newBoardNoticeList,
} from '@/repository/client/home/board-notice-list'
import { MainResponse } from '@/repository/client/home/main'
import { fetcher } from '../fetcher-action'
import { useFetchBasicState } from '../hooks'

export function useFetchBoardNotice() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    page,
    callback,
  }: {
    page: number
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: BoardNoticeListResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getBoardNoticeList({ page }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
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
    reset,
  }
}
export function useOnLoadBoardNoticeList({ page }: { page: number }) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [notice, setNotice] =
    useState<BoardNoticeListResponse>(newBoardNoticeList())

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getBoardNoticeList({ page }),
      )
      if (res.isSuccess && res.payload) {
        setNotice(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [page])

  return {
    loading,
    error,
    payload: notice,
  }
}

export function useOnLoadBoardNoticeDetail({ notifyId }: { notifyId: string }) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [notice, setNotice] = useState<BoardNoticeResponse>(newBoardNotice())

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getBoardNotice({ notifyId }),
      )

      if (res.isSuccess && res.payload) {
        setNotice(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [])

  return {
    loading,
    error,
    payload: notice,
  }
}

export function useOnLoadMain() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [payload, setPayload] = useState<MainResponse | undefined>(undefined)

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getMain())

      if (res.isSuccess && res.payload) {
        setPayload(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [])

  return {
    loading,
    error,
    payload,
  }
}
