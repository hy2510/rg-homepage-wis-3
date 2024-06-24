'use client'

import ClientTo from '@/app/_app/ClientTo'
import LoginForward from '@/app/_app/LoginForward'
import { getLoginExtra, resetLoginExtra } from '@/app/_context/LoginContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import { useFetchChangePassword } from '@/client/store/account/signin/hook'
import { Button, TextField } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import { isValidatePassword } from '../sign-up/_component/Signup'

const STYLE_ID = 'page_sign_in'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const [notFound, setNotFound] = useState(false)

  const [loginExtra] = useState(getLoginExtra())
  if (!notFound && loginExtra?.type !== 'ChangePassword') {
    setNotFound(true)
  }

  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [isWarningPassword, setWarningPassword] = useState(false)
  const [isWarningRepassword, setWarningRepassword] = useState(false)
  const [errorRedirect, setErrorRedirect] = useState('')
  const [loginRedirect, setLoginRedirect] = useState('')

  const { fetch: changePassword } = useFetchChangePassword()

  const onChangePassword = () => {
    if (!loginExtra) {
      return
    }
    if (!password) {
      alert(t('t215'))
      return
    }
    if (!isValidatePassword(password)) {
      alert(t('t183', { num1: 8, num2: 20 }))
      return
    }
    if (!repassword) {
      alert(t('t216'))
      return
    }
    if (password !== repassword) {
      alert(t('t217'))
      return
    }
    const hash = loginExtra.hash
    changePassword({
      hash,
      newPassword: password,
      callback: (data) => {
        resetLoginExtra()
        if (data.success) {
          setLoginRedirect(SITE_PATH.HOME.MAIN)
        } else {
          alert(t('t218'))
          setErrorRedirect(SITE_PATH.ACCOUNT.MAIN)
        }
      },
    })
  }

  if (notFound) {
    return <div></div>
  }
  if (!loginExtra?.type) {
    return <div>Loading</div>
  }
  if (errorRedirect) {
    return <ClientTo to={errorRedirect} isReplace />
  } else if (loginRedirect) {
    return <LoginForward to={loginRedirect} />
  }

  return (
    <main className={style.sign_in}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>
      <div className={style.log_in_box}>
        <div className={style.log_in_personal_member}>
          <div>* {t('t183', { num1: 8, num2: 20 })}</div>
          <TextField
            hint={t('t202')}
            password
            value={password}
            onTextChange={(text) => setPassword(text)}
            onFocusIn={(text) => setWarningPassword(false)}
            onFocusOut={(text) =>
              setWarningPassword(text.length > 0 && !isValidatePassword(text))
            }
          />
          {isWarningPassword && (
            <span
              style={{
                color: 'red',
              }}>{`[!] ${t('t220')}`}</span>
          )}
          <div>{`* ${t('t221')}`}</div>
          <TextField
            hint={t('t294')}
            password
            value={repassword}
            onTextChange={(text) => setRepassword(text)}
            onFocusIn={(text) => {
              setWarningRepassword(false)
              if (text !== password) {
                setRepassword('')
              }
            }}
            onFocusOut={(text) =>
              setWarningRepassword(text.length > 0 && text !== password)
            }
          />
          {isWarningRepassword && (
            <span
              style={{
                color: 'red',
              }}>{`[!] ${t('t220')}`}</span>
          )}
          <Button
            shadow={true}
            onClick={() => {
              onChangePassword()
            }}>
            {t('t222')}
          </Button>
        </div>
      </div>
    </main>
  )
}
