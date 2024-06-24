'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import { useLoginAction } from '@/app/_context/LoginContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useRef, useState } from 'react'
import { Button, TextField } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_sign_in'

export default function LoginFormAcademy({
  customHeader,
}: {
  customHeader?: ReactNode
}) {
  const style = useStyle(STYLE_ID)
  // @language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const onLogin = useLoginAction()

  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const loginIdInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const customerName = useCustomerInfo().customerGroupName
  const isLoginDisabled = !loginId || !password

  const requestLogin = (id: string, password: string) => {
    onLogin({
      id,
      password,
      onError: (code, message, redirect) => {
        if (code === 3000) {
        } else if (code === 2001 && redirect) {
          router.replace(redirect)
        }
        alert(message)
        passwordInputRef.current?.focus()
      },
    })
  }

  return (
    <>
      <div className={style.logIn_group_member}>
        {customHeader}
        <TextField
          ref={loginIdInputRef}
          id={'user-id'}
          hint={t('t233')}
          onTextChange={(text) => setLoginId(text)}
          value={loginId}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              if (!isLoginDisabled) {
                requestLogin(loginId, password)
              } else if (loginId && !password) {
                passwordInputRef?.current?.focus()
              }
            }
          }}
        />
        <TextField
          ref={passwordInputRef}
          id={'user-passowrd'}
          hint={t('t202')}
          password
          onTextChange={(text) => setPassword(text)}
          value={password}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              if (!isLoginDisabled) {
                requestLogin(loginId, password)
              } else if (!loginId && password) {
                loginIdInputRef?.current?.focus()
              }
            }
          }}
        />
        <Button
          shadow={!isLoginDisabled}
          color={isLoginDisabled ? 'gray' : undefined}
          onClick={() => {
            if (!isLoginDisabled) {
              requestLogin(loginId, password)
            }
          }}>
          {t('t214')}
        </Button>
        <div className={style.row_box}>
          <Link href={SITE_PATH.ACCOUNT.FORGOT_PASSWORD}>{t('t247')}</Link>
        </div>
        <div className={style.comment}>
          {`❗️ ${t('t257', { txt: customerName })}`}
        </div>
      </div>
    </>
  )
}
