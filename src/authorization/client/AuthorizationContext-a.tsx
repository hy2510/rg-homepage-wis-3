'use client'

import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

interface AuthorizationProps {
  children?: React.ReactNode
  id: string
  data?: unknown
}

const AuthorizationContext = React.createContext<
  | {
      loginTag: string
      session: unknown
      updater: {
        setLogin: (tag: string) => void
        setData: (data: unknown) => void
      }
    }
  | undefined
>(undefined)

export default function AuthorizationProvider(props: AuthorizationProps) {
  const { children } = props

  const [loginTag, setLoginTag] = useState<string>(props.id)
  const [session, setSession] = useState(props.data)

  const onChangeLogin = (loginTag: string) => {
    setLoginTag(loginTag)
  }
  const onChangeSession = (session: unknown) => {
    setSession(session)
  }

  return (
    <AuthorizationContext.Provider
      value={{
        loginTag,
        session,
        updater: {
          setLogin: onChangeLogin,
          setData: onChangeSession,
        },
      }}>
      {children}
    </AuthorizationContext.Provider>
  )
}

export function AuthorizationLoginUpdate({
  children,
  loginTag,
}: {
  children?: React.ReactNode
  loginTag: string
}) {
  const context = useContext(AuthorizationContext)
  const router = useRouter()

  useEffect(() => {
    router && router.refresh()
  }, [router])

  useEffect(() => {
    if (context) {
      if (context.loginTag !== loginTag) {
        context.updater?.setLogin(loginTag)
      }
    }
  }, [context, loginTag])

  return <>{children}</>
}

export function useIsLogin(): boolean {
  const context = useContext(AuthorizationContext)
  const tag = context?.loginTag || ''
  return tag.length > 0
}

export function useSession<T>(): T | undefined {
  const context = useContext(AuthorizationContext)
  const tag = context?.loginTag || ''
  const isLogin = tag.length > 0
  return isLogin ? (context?.session as T) : undefined
}
