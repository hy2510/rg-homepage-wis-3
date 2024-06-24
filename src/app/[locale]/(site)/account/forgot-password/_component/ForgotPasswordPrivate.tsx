'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useFetchForgotPassword,
  useFetchForgotPasswordConfirm,
} from '@/client/store/account/forgot/hook'
import {
  BackLink,
  Button,
  Nav,
  NavItem,
  TextField,
} from '@/ui/common/common-components'

type Step = 1 | 2 | 3
type FindType = 'Email' | 'Id'
export default function ForgotPasswordPrivate({
  style,
}: {
  style: Record<string, string>
}) {
  //@language 'common'
  const { t } = useTranslation()

  const [step, setStep] = useState<Step>(1)
  const [target, setTarget] = useState<FindType>('Email')

  const [sendEmail, setSendEmail] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [authCodeTime, setAuthCodeTime] = useState<number>(Date.now())

  const forgotPw = useFetchForgotPassword()
  const onRequestAuthCode = (keyword: string) => {
    setKeyword(keyword)
    forgotPw.fetch({
      type: target,
      keyword,
      callback: (data) => {
        if (data.success) {
          if (data.payload) {
            setSendEmail(data.payload.email)
            setAuthCodeTime(Date.now())
            setStep(2)
          }
        } else if (data.error) {
          const error = data.error as { extra: string }
          if (error.extra) {
            const extra = JSON.parse(error.extra)
            const code = extra.code || -1
            if (code === 1) {
              alert(t('t239'))
            } else if (code === 2) {
              alert(t('t240'))
            } else if (code === 3) {
              alert(t('t241'))
            } else if (code === 4) {
              alert(t('t242'))
            } else if (code === 9) {
              alert(t('t243'))
            }
          }
        }
      },
    })
  }

  const forgotPWConfirm = useFetchForgotPasswordConfirm()
  const onAuthPassword = (authCode: string) => {
    forgotPWConfirm.fetch({
      keyword,
      authCode,
      callback: (data) => {
        if (data.success && data.payload) {
          setStep(3)
        } else if (data.error) {
          const error = data.error as { extra: string }
          if (error.extra) {
            const extra = JSON.parse(error.extra)
            const code = extra.code || -1
            if (code === 1) {
              alert(t('t244'))
            } else if (code === 2) {
              alert(t('t245'))
            } else if (code === 3) {
              alert(t('t246'))
            }
          }
        }
      },
    })
  }

  const onClickLogin = () => {
    router.push(SITE_PATH.ACCOUNT.SIGN_IN)
  }

  const router = useRouter()

  return (
    <>
      <BackLink
        onClick={() => {
          if (step === 1) {
            router.back()
          } else {
            setStep(1)
          }
        }}>
        {t('t247')}
      </BackLink>
      {step === 1 && (
        <Step1ForgotPasswordInput
          tab={target}
          onRequestAuthCode={onRequestAuthCode}
          onChangeTab={(tab) => setTarget(tab)}
          style={style}
        />
      )}
      {step === 2 && (
        <Step2AuthCodeInput
          codeTime={authCodeTime}
          sendEmail={sendEmail}
          onValidateCode={onAuthPassword}
          onRetryAuthCode={() => onRequestAuthCode(keyword)}
          style={style}
        />
      )}
      {step === 3 && (
        <Step3FindPasswordResult
          sendEmail={sendEmail}
          onClickLogin={onClickLogin}
          style={style}
        />
      )}
    </>
  )
}

function Step1ForgotPasswordInput({
  tab,
  onChangeTab,
  onRequestAuthCode,
  style,
}: {
  tab: FindType
  onChangeTab: (tab: FindType) => void
  onRequestAuthCode: (keyword: string) => void
  style: Record<string, string>
}) {
  const { t } = useTranslation()

  const [email, setEmail] = useState<string>('')
  const [loginId, setLoginId] = useState<string>('')

  const comment = tab === 'Email' ? `* ${t('t227')}` : `* ${t('t248')}`

  return (
    <>
      <div style={{ overflow: 'auto' }}>
        <Nav>
          <NavItem
            active={tab == 'Email'}
            onClick={() => {
              onChangeTab('Email')
            }}>
            {t('t229')}
          </NavItem>
          <NavItem
            active={tab == 'Id'}
            onClick={() => {
              onChangeTab('Id')
            }}>
            {t('t249')}
          </NavItem>
        </Nav>
      </div>
      <div className={style.comment}>{comment}</div>
      {tab == 'Email' && (
        <TextField
          hint={'E-Mail'}
          value={email}
          onTextChange={(text) => setEmail(text)}
        />
      )}
      {tab == 'Id' && (
        <TextField
          hint={t('t233')}
          value={loginId}
          onTextChange={(text) => setLoginId(text)}
        />
      )}
      <Button
        shadow
        onClick={() => {
          const keyword = tab === 'Id' ? loginId : email
          onRequestAuthCode(keyword)
        }}>
        {t('t231')}
      </Button>
    </>
  )
}

function Step2AuthCodeInput({
  codeTime,
  sendEmail,
  onValidateCode,
  onRetryAuthCode,
  style,
}: {
  codeTime: number
  sendEmail: string
  onValidateCode: (code: string) => void
  onRetryAuthCode: () => void
  style: Record<string, string>
}) {
  //@language 'common'
  const { t } = useTranslation()

  const [authCode, setAuthCode] = useState('')

  const { currentTime, reset } = useCountDown({
    timeset: BASE_TIME,
    autoStart: true,
  })

  useEffect(() => {
    reset()
  }, [codeTime, reset])

  const minute = Math.floor(currentTime / 60)
  const second = currentTime % 60

  const onCodeCheck = () => {
    if (currentTime > 0 && authCode.length > 0) {
      onValidateCode && onValidateCode(authCode)
    }
  }

  return (
    <>
      <div className={style.sending_message}>
        <b>* {sendEmail}</b>
        <span>{t('t250')}</span>
      </div>

      <TextField
        hint={t('t251')}
        value={authCode}
        maxLength={6}
        onTextChange={(text) => setAuthCode(text)}
      />
      <Button
        shadow={currentTime > 0}
        onClick={onCodeCheck}
        color={currentTime <= 0 || authCode.length === 0 ? 'gray' : undefined}>
        {t('t252')}
        {`(${minute > 9 ? minute : `0${minute}`}:${second > 9 ? second : `0${second}`})`}
      </Button>
      {currentTime <= BASE_TIME / 4 && (
        <div className={style.link_button_container}>
          <div
            className={style.link_button}
            onClick={() => {
              onRetryAuthCode()
            }}>
            {t('t253')}
          </div>
        </div>
      )}
    </>
  )
}

function Step3FindPasswordResult({
  sendEmail,
  onClickLogin,
  style,
}: {
  sendEmail: string
  onClickLogin: () => void
  style: Record<string, string>
}) {
  // @language 'common'
  const { t } = useTranslation()
  return (
    <>
      <div>{t('t254', { txt: sendEmail })}</div>
      <Button
        shadow
        onClick={() => {
          onClickLogin()
        }}>
        {t('t214')}
      </Button>
    </>
  )
}

const BASE_TIME = 60 * 10
function useCountDown({
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
