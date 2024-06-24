import repository from '@/repository/client'
import { ForgotIdResponse } from '@/repository/client/account/forgot-id'
import { ForgotIdWithClassAndStudentNameResponse } from '@/repository/client/account/forgot-id-class-and-student-name'
import { ForgotPasswordResponse } from '@/repository/client/account/forgot-password'
import { ForgotPasswordConfirmResponse } from '@/repository/client/account/forgot-password-confirm'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useFetchForgotId() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    type,
    keyword,
    callback,
  }: {
    type: 'Email' | 'Phone'
    keyword: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: ForgotIdResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getForgotId({
          type,
          keyword,
        }),
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

export function useFetchForgotIdWithClassAndStudentName() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    classId,
    studentName,
    callback,
  }: {
    classId: string
    studentName: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: ForgotIdWithClassAndStudentNameResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postForgotIdClassAndStudentName({
          classId,
          studentName,
        }),
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

export function useFetchFindIdWithClassAndStudentName() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    classId,
    studentName,
    password,
    callback,
  }: {
    classId: string
    studentName: string
    password: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: ForgotIdWithClassAndStudentNameResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postFindIdClassAndStudentName({
          classId,
          studentName,
          password,
        }),
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

export function useFetchForgotPassword() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    type,
    keyword,
    callback,
  }: {
    type: 'Id' | 'Email'
    keyword: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: ForgotPasswordResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getForgotPassword({
          type,
          keyword,
        }),
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

export function useFetchForgotPasswordConfirm() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    keyword,
    authCode,
    callback,
  }: {
    keyword: string
    authCode: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: ForgotPasswordConfirmResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postForgotPasswordConfirm({
          keyword,
          authCode,
        }),
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
