'use client'

import { useLoginAction } from '@/app/_context/LoginContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  useFetchSignupEmailCertification,
  useFetchSignupEmailConfirm_VN,
  useFetchSignupPhoneCertification_VN,
  useFetchSignupPhoneConfirm_VN,
  useFetchSignup_VN,
} from '@/client/store/account/signup/hook'
import { useStudentIsLogin } from '@/client/store/student/info/selector'
import {
  AlertBar,
  BackLink,
  Button,
  TextField,
} from '@/ui/common/common-components'
import {
  BASE_TIME,
  CheckField,
  isValidateEmailVn,
  isValidatePasswordVn,
  isValidateStudentName,
  useCountDown,
} from './Signup'

type Step = 1 | 2 | 3 | 4
type SignupParams = {
  email: string
  studentName: string
  password: string
  repassword: string
  checkAge: boolean
  checkPolicy: boolean
  checkTerms: boolean
  phone: string
}
export default function SignupVN({ style }: { style: Record<string, string> }) {
  // @Language 'common'
  const { t } = useTranslation()

  const isLogin = useStudentIsLogin()

  const [step, setStep] = useState<Step>(1)

  const [signupParams, setSignupParams] = useState<SignupParams>({
    email: '',
    studentName: '',
    password: '',
    repassword: '',
    checkAge: false,
    checkPolicy: false,
    checkTerms: false,
    phone: '',
  })

  const onLogin = useLoginAction()
  const [loginAction, setLoginAction] = useState<boolean>(false)

  const emailCert = useFetchSignupEmailCertification()
  const onValidateSignupParams = (params: SignupParams) => {
    if (!params.studentName) {
      alert(t('t176'))
      return
    }
    if (!isValidateStudentName(params.studentName)) {
      alert(t('t177'))
      return
    }
    if (!params.email) {
      alert(t('t276'))
      return
    }
    if (!isValidateEmailVn(params.email)) {
      alert(t('t277'))
      return
    }
    if (!params.password) {
      alert(t('t215'))
      return
    }
    if (!isValidatePasswordVn(params.password)) {
      alert(t('t301'))
      return
    }
    if (!params.repassword) {
      alert(t('t216'))
      return
    }
    if (params.password !== params.repassword) {
      alert(t('t217'))
      return
    }
    if (!params.checkAge) {
      alert(t('t278'))
      return
    }
    if (!params.checkPolicy) {
      alert(t('t279'))
      return
    }
    if (!params.checkTerms) {
      alert(t('t280'))
      return
    }

    emailCert.fetch({
      email: params.email,
      password: params.password,
      studentName: params.studentName,
      callback: (data) => {
        if (data.success) {
          setSignupParams(params)
          setStep(2)
        } else if (data.error) {
          const error = data.error as { extra: string }
          if (error.extra) {
            const extra = JSON.parse(error.extra)
            const code = extra.code || -1
            if (code === 1) {
              alert(t('t281'))
            } else if (code === 2) {
              alert(t('t282'))
            }
          }
        }
      },
    })
  }
  const onRetryRequestEmailCode = () => {
    onValidateSignupParams(signupParams)
  }

  const emailConfirm = useFetchSignupEmailConfirm_VN()
  const onEmailValidateCode = (authCode: string) => {
    // TODO : 회원가입 이메일 인증

    emailConfirm.fetch({
      email: signupParams.email,
      authCode,
      callback: (data) => {
        if (data.success) {
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
              alert(t('t284'))
            }
          }
        } else {
          alert('fail')
        }
      },
    })
  }

  const phoneCert = useFetchSignupPhoneCertification_VN()
  const onRequestPhoneCode = (phone: string) => {
    phoneCert.fetch({
      phone,
      callback: (data) => {
        if (data.success) {
          setSignupParams({ ...signupParams, phone })
          setStep(4)
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
              alert(t('t284'))
            }
          }
        } else {
          alert('fail')
        }
      },
    })
  }
  const onRetryRequestPhoneCode = () => {
    onRequestPhoneCode(signupParams.phone)
  }

  const phoneConfirm = useFetchSignupPhoneConfirm_VN()
  const onPhoneValidateCode = (authCode: string) => {
    phoneConfirm.fetch({
      phone: signupParams.phone,
      authCode,
      callback: (data) => {
        if (data.success) {
          onSignup()
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
              alert(t('t284'))
            }
          }
        } else {
          alert('fail')
        }
      },
    })
  }

  const signup = useFetchSignup_VN()
  const onSignup = () => {
    signup.fetch({
      phone: signupParams.phone,
      email: signupParams.email,
      callback: (data) => {
        if (data.success) {
          setLoginAction(true)
          onLogin({
            id: signupParams.email,
            password: signupParams.password,
            redirectPath: SITE_PATH.ACCOUNT.SIGN_UP_WELCOME,
            onError: (err) => {
              alert(t('t283'))
            },
          })
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
              alert(t('t284'))
            }
          }
        } else {
          alert('fail')
        }
      },
    })
  }

  const router = useRouter()

  if (isLogin && !loginAction) {
    return (
      <main>
        <BackLink onClick={() => router.back()}>{t('t302')}</BackLink>
        <div>
          <div style={{ marginTop: '1rem' }}>{t('t285')}</div>
        </div>
      </main>
    )
  }

  return (
    <>
      {step === 1 && (
        <Step1SignupInputVN
          onClickBack={() => {
            router.back()
          }}
          formData={signupParams}
          onFormUpdate={(formData) => onValidateSignupParams(formData)}
          style={style}
        />
      )}
      {step === 2 && (
        <Step2EmailAuth
          userEmail={signupParams.email}
          onPrevStep={() => setStep(1)}
          onValidateCode={onEmailValidateCode}
          onReSendCode={onRetryRequestEmailCode}
          style={style}
        />
      )}
      {step === 3 && (
        <Step3PhoneInput
          onPrevStep={() => setStep(1)}
          onRequestPhoneCode={onRequestPhoneCode}
          style={style}
        />
      )}
      {step === 4 && (
        <Step4PhoneAuth
          userPhone={signupParams.phone}
          onPrevStep={() => setStep(1)}
          onValidateCode={onPhoneValidateCode}
          onReSendCode={onRetryRequestPhoneCode}
          style={style}
        />
      )}
    </>
  )
}

function Step1SignupInputVN({
  onClickBack,
  formData,
  onFormUpdate,
  style,
}: {
  onClickBack?: () => void
  formData: SignupParams
  onFormUpdate: (formData: SignupParams) => void
  style: Record<string, string>
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [email, setEmail] = useState(formData.email)
  const [studentName, setStudentName] = useState(formData.studentName)
  const [password, setPassword] = useState(formData.password)
  const [repassword, setRepassword] = useState(formData.repassword)
  const [checkAge, setCheckAge] = useState(formData.checkAge)
  const [checkPolicy, setCheckPolicy] = useState(formData.checkPolicy)
  const [checkTerms, setCheckTerms] = useState(formData.checkTerms)

  const [isWarningStudentName, setWarningStudentName] = useState(false)
  const [isWarningEmail, setWarningEmail] = useState(false)
  const [isWarningPassword, setWarningPassword] = useState(false)
  const [isWarningRepassword, setWarningRepassword] = useState(false)

  return (
    <main className={style.step1}>
      <BackLink onClick={() => onClickBack && onClickBack()}>
        {t('t286')}
      </BackLink>
      <AlertBar>{t('t287')}</AlertBar>
      <div className={style.sign_up_form}>
        <div className={style.comment}>{`* ${t('t288')}`}</div>
        <TextField
          hint={t('t289')}
          value={studentName}
          onTextChange={(text) => setStudentName(text)}
          onFocusIn={(text) => setWarningStudentName(false)}
          onFocusOut={(text) =>
            setWarningStudentName(
              text.length > 1 && !isValidateStudentName(text),
            )
          }
        />
        {isWarningStudentName && (
          <span style={{ color: 'red' }}>{`[!] ${t('t290')}`}</span>
        )}
        <div className={style.comment}>{`* ${t('t291')}`}</div>
        <TextField
          hint={t('t292')}
          value={email}
          onTextChange={(text) => setEmail(text)}
          onFocusIn={(text) => setWarningEmail(false)}
          onFocusOut={(text) =>
            setWarningEmail(text.length > 0 && !isValidateEmailVn(text))
          }
        />
        {isWarningEmail && (
          <span
            style={{
              color: 'red',
            }}>{`[!] ${t('t293')}`}</span>
        )}
        <div className={style.comment}>
          {`* ${t('t184', { num1: 8, num2: 20 })}`}
        </div>
        <TextField
          hint={t('t202')}
          password
          value={password}
          onTextChange={(text) => setPassword(text)}
          onFocusIn={(text) => setWarningPassword(false)}
          onFocusOut={(text) =>
            setWarningPassword(text.length > 0 && !isValidatePasswordVn(text))
          }
        />
        {isWarningPassword && (
          <span
            style={{
              color: 'red',
            }}>{`[!] ${t('t220')}`}</span>
        )}
        <div className={style.comment}>{`* ${t('t221')}`}</div>
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
        <CheckField
          style={style}
          value={checkAge}
          onCheckedChange={(isChecked) => setCheckAge(isChecked)}>
          {t('t295')}
        </CheckField>
        <CheckField
          style={style}
          value={checkPolicy}
          onCheckedChange={(isChecked) => setCheckPolicy(isChecked)}>
          {`${t('t296')} `}
          <span
            style={{ color: '#0062e3', cursor: 'pointer', fontWeight: '500' }}>
            {t('t297')}
          </span>
          {t('t298')}
        </CheckField>
        <CheckField
          style={style}
          value={checkTerms}
          onCheckedChange={(isChecked) => setCheckTerms(isChecked)}>
          {`${t('t296')} `}
          <span
            style={{
              color: '#0062e3',
              cursor: 'pointer',
              fontWeight: '500',
            }}>
            {t('t299')}
          </span>
          {t('t298')}
        </CheckField>
        <Button
          shadow
          onClick={() => {
            onFormUpdate &&
              onFormUpdate({
                email,
                studentName,
                password,
                repassword,
                checkAge,
                checkPolicy,
                checkTerms,
                phone: '',
              })
          }}>
          {t('t300')}
        </Button>
      </div>
    </main>
  )
}

function Step2EmailAuth({
  userEmail,
  onPrevStep,
  onValidateCode,
  onReSendCode,
  style,
}: {
  userEmail?: string
  onPrevStep?: () => void
  onValidateCode?: (code: string) => void
  onReSendCode?: () => void
  style: Record<string, string>
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [authCode, setAuthCode] = useState('')

  const { currentTime, reset } = useCountDown({
    timeset: BASE_TIME,
    autoStart: true,
  })

  const minute = Math.floor(currentTime / 60)
  const second = currentTime % 60

  const onCodeCheck = () => {
    if (currentTime > 0 && authCode.length > 0) {
      onValidateCode && onValidateCode(authCode)
    }
  }

  return (
    <main className={style.step2}>
      <BackLink onClick={() => onPrevStep && onPrevStep()}>
        {t('t197')}
      </BackLink>
      <div className={style.sending_message}>
        <b>* {userEmail}</b>
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
              onReSendCode && onReSendCode()
              reset()
            }}>
            {t('t253')}
          </div>
        </div>
      )}
    </main>
  )
}

function Step3PhoneInput({
  onPrevStep,
  onRequestPhoneCode,
  style,
}: {
  onPrevStep?: () => void
  onRequestPhoneCode?: (phone: string) => void
  style: Record<string, string>
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [phoneNumber, setPhoneNumber] = useState('')

  const onRequestCode = () => {
    if (phoneNumber.length > 0) {
      onRequestPhoneCode && onRequestPhoneCode(phoneNumber)
    }
  }

  return (
    <main className={style.step2}>
      <BackLink onClick={() => onPrevStep && onPrevStep()}>
        {t('t197')}
      </BackLink>

      <TextField
        hint={t('t304')}
        value={phoneNumber}
        maxLength={13}
        onTextChange={(text) => setPhoneNumber(text)}
      />
      <Button
        shadow={phoneNumber.length > 5}
        onClick={onRequestCode}
        color={phoneNumber.length <= 5 ? 'gray' : undefined}>
        {t('t305')}
      </Button>
    </main>
  )
}

function Step4PhoneAuth({
  userPhone,
  onPrevStep,
  onValidateCode,
  onReSendCode,
  style,
}: {
  userPhone: string
  onPrevStep?: () => void
  onValidateCode?: (code: string) => void
  onReSendCode?: () => void
  style: Record<string, string>
}) {
  //// @Language 'common'
  const { t } = useTranslation()

  const [authCode, setAuthCode] = useState('')

  const { currentTime, reset } = useCountDown({
    timeset: BASE_TIME,
    autoStart: true,
  })

  const minute = Math.floor(currentTime / 60)
  const second = currentTime % 60

  const onCodeCheck = () => {
    if (currentTime > 0 && authCode.length > 0) {
      onValidateCode && onValidateCode(authCode)
    }
  }

  return (
    <main className={style.step2}>
      <BackLink onClick={() => onPrevStep && onPrevStep()}>
        {t('t197')}
      </BackLink>
      <div className={style.sending_message}>
        <b>* {userPhone}</b>
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
              onReSendCode && onReSendCode()
              reset()
            }}>
            {t('t253')}
          </div>
        </div>
      )}
    </main>
  )
}
