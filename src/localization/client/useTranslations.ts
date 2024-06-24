import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLanguagePackContext } from './LanguagePackContext'
import { i18nRG, TFunctionRG } from './i18next-client'

/**
 * React에서 문자열에 지역화를 적용하고자 할 때 사용하는 Hook이다.
 *
 * @param namespace 문자열 그룹 구분
 * @returns {
 *   t: 문자열 formatter 함수, t('키 문자열')으로 호출하면 지역화에 정의된('값 문자열') 문자열을 리턴한다. 만약 리소스를 찾지 못하면, '키 문자열'을 그대로 리턴한다.
 *   i18n: i18n 객체
 * }
 */
export default function useTranslation(namespace?: string): {
  t: TFunctionRG
  i18n: i18nRG
} {
  const { i18n, language } = useLanguagePackContext()

  const t = useMemo(() => {
    return i18n.getFixedT(language, namespace)
  }, [i18n, language, namespace])

  return {
    t,
    i18n,
  }
}
