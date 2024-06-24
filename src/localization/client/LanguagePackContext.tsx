'use client'

import React, { useContext, useEffect, useState } from 'react'
import { i18nRG, createInstance, appendResources } from './i18next-client'

const LanguagePackContext = React.createContext<
  { i18n: i18nRG; language: string } | undefined
>(undefined)

interface LanguagePackProps {
  children: React.ReactNode
  language?: string
  namespace: string
  res?: any
}

/**
 * LanguagePackContext를 연동하는 단계로, LanguageResourceProvider보다 상위 DOM에 위치해야 한다.
 *
 * i18n 객체를 생성한다.
 * 객체 생성과 동시에 Namespace에 대한 문자열 객체를 i18n에 추가한다.
 *
 * @param LanguagePackProps: {children: React DOM, language: 언어, namespace: 문자열 그룹 구분, res: 문자열 객체(JSON Stringify)}
 * @returns
 */
export default function LanguagePackContextProvider(props: LanguagePackProps) {
  const { children, language: lang, namespace, res } = props
  const language = lang!
  const [loading, setLoading] = useState(true)
  const [context, setContext] = useState<{ i18n: i18nRG; language: string }>()

  useEffect(() => {
    const createInstanceAsync = async () => {
      const instance = await createInstance({
        language,
        namespace,
        res,
      })
      setContext({
        i18n: instance,
        language,
      })
      setLoading(false)
    }
    createInstanceAsync()
  }, [language, namespace, res])

  if (loading) {
    return <p>Context Loading ...</p>
  }
  return (
    <LanguagePackContext.Provider value={context}>
      {children}
    </LanguagePackContext.Provider>
  )
}

/**
 * Namespace에 대한 문자열 객체를 i18n에 추가하는 컴포넌트
 * @param LanguagePackProps: {children: React DOM, namespace: 문자열 그룹 구분, res: 문자열 객체(JSON Stringify)}
 * @returns
 */
export function LanguageResourceProvider({
  children,
  namespace,
  res,
}: LanguagePackProps) {
  const context = useContext(LanguagePackContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (context) {
      const { i18n, language } = context
      appendResources({ i18n, language, namespace, res })
      setLoading(false)
    }
  }, [context, namespace, res])

  if (loading) {
    return <p>Resource Loading ...</p>
  }
  return <>{children}</>
}

/**
 * LanguagePackContext 값을 불러온다.
 * @returns LanguagePackContext의 value
 */
export function useLanguagePackContext() {
  const context = useContext(LanguagePackContext)
  if (!context) {
    throw new Error('LanguagePackContext Initialize Failed..')
  }
  return context
}
