'use client'

import { setTempolaryAccount } from '@/app/_account/account-list'
import LoginForward from '@/app/_app/LoginForward'
import { useCustomerInfo } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import React, { useContext, useRef, useState } from 'react'
import { useFetchSignin } from '@/client/store/account/signin/hook'

type LoginActionParam = {
  id: string
  password: string
  isSavePassword?: boolean
  deviceType?: string
  redirectPath?: string
  onError?: (code: number, message: string, redirect?: string) => void
}

type LoginContextProps = {
  action: {
    login: (param: LoginActionParam) => void
  }
}

const LoginContext = React.createContext<LoginContextProps | undefined>(
  undefined,
)

type LoginExtra = {
  type: 'ChangePassword' | 'NeedClass' | 'StaffLogin'
  hash: string
}
let loginExtra: LoginExtra | undefined = undefined
export function getLoginExtra() {
  return loginExtra
}
export function resetLoginExtra() {
  loginExtra = undefined
}

export default function LoginContextProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const { customerId } = useCustomerInfo()

  const waitRef = useRef<boolean>(false)
  const [redirect, setRedirect] = useState('')
  const { loading: isLoadingSignin, fetch: signinFetch } = useFetchSignin()
  const loginAction = ({
    id,
    password,
    deviceType = 'TEST_DEVICE',
    isSavePassword = false,
    redirectPath,
    onError,
  }: LoginActionParam) => {
    if (isLoadingSignin) {
      return
    }
    if (redirect) {
      return
    }
    if (!id) {
      return
    }
    if (!password) {
      return
    }
    if (waitRef.current) {
      return
    }
    waitRef.current = true
    setTimeout(() => {
      waitRef.current = false
    }, 1000)
    signinFetch({
      id,
      password,
      deviceType,
      callback: (data) => {
        if (data.success) {
          setTempolaryAccount({
            customerId: customerId,
            loginId: id,
            password: isSavePassword ? password : '',
          })
          setRedirect(redirectPath ? redirectPath : SITE_PATH.HOME.MAIN)
        } else {
          let errorCode = -1
          let errorMessage = '로그인에 실패하였습니다.'
          let extra = undefined
          let redirect = undefined
          if (data.error) {
            errorCode = (data.error as { code: number }).code
            extra = (data.error as { extra: any }).extra
            if (errorCode === 3000) {
              errorMessage = '비밀번호가 일치하지 않습니다.'
            } else if (errorCode === 2002) {
              errorMessage = '관리자계정은 로그인 할 수 없습니다.'
            } else if (errorCode === 2001) {
              loginExtra = {
                type: 'ChangePassword',
                hash: extra.hash,
              }
              errorMessage =
                '임시 비밀번호로 로그인하였습니다. 변경 후 다시 이용해주세요.'
              redirect = `${SITE_PATH.ACCOUNT.CHANGE_PASSWORD}`
            } else if (errorCode === 9998) {
              // 9998 오류 발생 시 아무 메시지도 출력하지 않음.
              return
            }
          }
          onError && onError(errorCode, errorMessage, redirect)
        }
      },
    })
  }
  return (
    <LoginContext.Provider
      value={{
        action: {
          login: loginAction,
        },
      }}>
      {children}
      {redirect && <LoginForward to={redirect} />}
    </LoginContext.Provider>
  )
}

export function useLoginAction() {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.action.login
}
