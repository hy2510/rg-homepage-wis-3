'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const STORAGE_LOGIN_TAG_KEY = 'ss'

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

  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)
  const router = useRouter()

  const [loginTag, setLoginTag] = useState<string>(props.id)
  const [session, setSession] = useState(props.data)

  const onChangeLogin = (loginTag: string) => {
    if (windowRef) {
      if (loginTag) {
        windowRef.localStorage.setItem(STORAGE_LOGIN_TAG_KEY, loginTag)
      } else {
        windowRef.localStorage.removeItem(STORAGE_LOGIN_TAG_KEY)
      }
    }
    setLoginTag(loginTag)
    if (loginTag) {
      router && router.refresh()
    }
  }
  const onChangeSession = (session: unknown) => {
    setSession(session)
  }

  const storageEvent = useCallback(
    (e: StorageEvent) => {
      if (e && e.key === STORAGE_LOGIN_TAG_KEY) {
        if (router) {
          router.refresh()
        }
      }
    },
    [router],
  )
  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowRef(window)
    }
  }, [])
  useEffect(() => {
    if (windowRef) {
      windowRef.addEventListener('storage', storageEvent)
    }
    return () => {
      if (windowRef) {
        windowRef.removeEventListener('storage', storageEvent)
      }
    }
  }, [windowRef, storageEvent])

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
