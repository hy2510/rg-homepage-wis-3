'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import LoginContextProvider from '@/app/_context/LoginContext'
import useTranslation from '@/localization/client/useTranslations'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { CheckBox } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import SignupKR from './SignupKR'
import SignupVN from './SignupVN'

const STYLE_ID = 'page_sign_up'

export default function Signup() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const customer = useCustomerInfo()
  const customerUse = customer.customerUse
  const countryCode = customer.countryCode

  const isNotSupportSignup =
    customerUse !== 'Private' || (countryCode !== 'KR' && countryCode !== 'VN')
  if (isNotSupportSignup) {
    return <div>{t('t275')}</div>
  }
  return (
    <div className={style.sign_up_box}>
      <LoginContextProvider>
        {countryCode === 'KR' && <SignupKR style={style} />}
        {countryCode === 'VN' && <SignupVN style={style} />}
      </LoginContextProvider>
    </div>
  )
}

///////////////////////////////////////////////////
export const CheckField = ({
  value,
  onCheckedChange,
  children,
  style,
}: {
  style: Record<string, string>
  value?: boolean
  onCheckedChange?: (isChecked: boolean) => void
  children?: ReactNode
}) => {
  const [checked, _checked] = useState(false)
  if (value !== undefined && value !== checked) {
    _checked(value)
  }

  return (
    <div className={style.check_field}>
      <CheckBox
        check={checked}
        onClick={() => {
          checked ? _checked(false) : _checked(true)
          onCheckedChange && onCheckedChange(!checked)
        }}
      />
      <span>{children}</span>
    </div>
  )
}

///////////////////////////////////////////////////

export const BASE_TIME = 60 * 10
export function useCountDown({
  timeset,
  autoStart = false,
}: {
  timeset: number
  autoStart?: boolean
}) {
  const [on, setOn] = useState(autoStart)
  const [timeDelta, setTimeDelta] = useState(0)
  const refTimeMemo = useRef<number>(Date.now())

  useEffect(() => {
    let id: NodeJS.Timeout | undefined
    if (on) {
      refTimeMemo.current = Date.now()
      id = setInterval(() => {
        const nowTime = Date.now()
        const timeDelta = Math.floor((nowTime - refTimeMemo.current) / 1000)
        setTimeDelta(timeDelta)
        if (timeDelta >= timeset) {
          setOn(false)
        }
      }, 1000)
    }
    return () => {
      id && clearInterval(id)
    }
  }, [on, timeset])

  const stop = useCallback(() => {
    setOn(false)
  }, [setOn])

  const start = useCallback(() => {
    setOn(true)
  }, [setOn])

  const reset = useCallback(() => {
    refTimeMemo.current = Date.now()
    setOn(true)
  }, [setOn])

  return {
    currentTime: timeset - timeDelta,
    stop,
    start,
    reset,
  }
}

///////////////////////////////////////////////////

export function isValidateEmail(email: string) {
  // 이메일 정규식 (베트남 제외)
  const REGEX_EMAIL =
    /^[0-9a-zA-Z]([0-9a-zA-Z-_])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i
  return REGEX_EMAIL.test(email)
}

export function isValidateEmailVn(email: string) {
  // 이메일 정규식 베트남
  const REGEX_EMAIL_VN =
    /^[0-9a-zA-Z]([0-9a-zA-Z-_.])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i
  return REGEX_EMAIL_VN.test(email)
}

export function isValidateStudentName(studentName: string) {
  // 이모지 구분 정규식
  const REGEX_EMOJI =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
  // 제외할 특수문자 졍규식
  const REGEX_EXCLUDE = /[\"&%{}?=\[\]\\]/
  return !(REGEX_EMOJI.test(studentName) || REGEX_EXCLUDE.test(studentName))
}

export function isValidatePassword(password: string) {
  // 비밀번호 정규식:  8 ~ 20자 소문자, 숫자 조합
  const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{8,20}$/
  return REGEX_PASSWORD.test(password)
}

export function isValidatePasswordVn(password: string) {
  // 문자열 길이 측정 8~20자
  const rangeRegex = /^.{8,20}$/
  if (!rangeRegex.test(password)) {
    return false
  }
  // 문자열 내 알파벳 소문자 포함
  const alphabetSmallRegex = /[a-z]/
  if (!alphabetSmallRegex.test(password)) {
    return false
  }
  // 문자열 내 알파벳 대문자 포함
  const alphabetLargeRegex = /[A-Z]/
  if (!alphabetLargeRegex.test(password)) {
    return false
  }
  // 문자열 내 숫자 포함
  const numberRegex = /[0-9]/
  if (!numberRegex.test(password)) {
    return false
  }
  // 문자열 내 특수문자 포함
  const specialCharRegex = /[ !@#$%^&*()=_+{}\[\]\|:;<>,.?~\\/-]/
  if (!specialCharRegex.test(password)) {
    return false
  }

  return true
}
