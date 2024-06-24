import repository from '@/repository/client'
import { SignupCertEmail } from '@/repository/client/account/signup-cert-email'
import { SignupCertPhone_VN } from '@/repository/client/account/signup-cert-phone-vn'
import { SignupConfirmEmail } from '@/repository/client/account/signup-confirm-email'
import { SignupConfirmEmail_VN } from '@/repository/client/account/signup-confirm-email-vn'
import { SignupConfirmPhone_VN } from '@/repository/client/account/signup-confirm-phone-vn'
import { Signup_VN } from '@/repository/client/account/signup-vn'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useFetchSignupEmailCertification() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    email,
    password,
    studentName,
    callback,
  }: {
    email: string
    password: string
    studentName: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SignupCertEmail
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postSignupCertEmail({
          email,
          password,
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

export function useFetchSignupEmailConfirm() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    email,
    authCode,
    callback,
  }: {
    email: string
    authCode: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SignupConfirmEmail
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postSignupConfirmEmail({
          email,
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

export function useFetchSignupEmailConfirm_VN() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    email,
    authCode,
    callback,
  }: {
    email: string
    authCode: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SignupConfirmEmail_VN
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postSignupConfirmEmail_VN({
          email,
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

export function useFetchSignupPhoneCertification_VN() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    phone,
    callback,
  }: {
    phone: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SignupCertPhone_VN
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postSignupCertPhone_VN({
          phone,
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

export function useFetchSignupPhoneConfirm_VN() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    phone,
    authCode,
    callback,
  }: {
    phone: string
    authCode: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SignupConfirmPhone_VN
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postSignupConfirmPhone_VN({
          phone,
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

export function useFetchSignup_VN() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    phone,
    email,
    callback,
  }: {
    phone: string
    email: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: Signup_VN
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postSignup_VN({
          phone,
          email,
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
