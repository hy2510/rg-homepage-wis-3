'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFetchForgotId } from '@/client/store/account/forgot/hook'
import { ForgotIdResponse } from '@/repository/client/account/forgot-id'
import {
  BackLink,
  Button,
  Nav,
  NavItem,
  TextField,
} from '@/ui/common/common-components'
import BoxUserInfo from '@/ui/modules/account-components/box-user-info'

type Step = 1 | 2
type FindType = 'Email' | 'Phone'
export default function ForgotIdPrivate({
  style,
}: {
  style: Record<string, string>
}) {
  // @language 'common'
  const { t } = useTranslation()

  const [step, setStep] = useState<Step>(1)
  const [target, setTarget] = useState<FindType>('Phone')

  const [findResult, setFindResult] = useState<ForgotIdResponse>([])

  const forgotId = useFetchForgotId()
  const onFindId = (keyword: string) => {
    forgotId.fetch({
      type: target,
      keyword,
      callback: (data) => {
        if (data.success) {
          if (data.payload) {
            setFindResult([...data.payload])
            setStep(2)
          }
        } else if (data.error) {
          const error = data.error as { code: number; message: string }
          if (error.code === 1000) {
            alert(t('t224'))
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
    <main className={style.forgot_id}>
      <BackLink
        onClick={() => {
          if (step === 1) {
            router.back()
          } else {
            setStep(1)
          }
        }}>
        {t('t225')}
      </BackLink>
      {step === 1 && (
        <Step1ForgotIdInput
          tab={target}
          onFindId={onFindId}
          onChangeTab={(tab) => setTarget(tab)}
          style={style}
        />
      )}
      {step === 2 && (
        <Step2FindIdResult result={findResult} onClickLogin={onClickLogin} />
      )}
    </main>
  )
}

function Step1ForgotIdInput({
  tab,
  onChangeTab,
  onFindId,
  style,
}: {
  tab: FindType
  onChangeTab: (tab: FindType) => void
  onFindId: (keyword: string) => void
  style: Record<string, string>
}) {
  // @language 'common'
  const { t } = useTranslation()

  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const comment = tab === 'Phone' ? `* ${t('t226')}` : `* ${t('t227')}`
  return (
    <>
      <div style={{ overflow: 'auto' }}>
        <Nav>
          <NavItem
            active={tab == 'Phone'}
            onClick={() => {
              onChangeTab('Phone')
            }}>
            {t('t228')}
          </NavItem>
          <NavItem
            active={tab == 'Email'}
            onClick={() => {
              onChangeTab('Email')
            }}>
            {t('t229')}
          </NavItem>
        </Nav>
      </div>
      <div className={style.comment}>{comment}</div>
      {tab == 'Phone' && (
        <TextField
          hint={t('t230')}
          value={phoneNumber}
          onTextChange={(text) => setPhoneNumber(text)}
        />
      )}
      {tab == 'Email' && (
        <TextField
          hint={'E-Mail'}
          value={email}
          onTextChange={(text) => setEmail(text)}
        />
      )}
      <Button
        shadow
        onClick={() => {
          const keyword = tab === 'Phone' ? phoneNumber : email
          onFindId(keyword)
        }}>
        {t('t231')}
      </Button>
    </>
  )
}

function Step2FindIdResult({
  result,
  onClickLogin,
}: {
  result: ForgotIdResponse
  onClickLogin: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  return (
    <>
      {result.map((item, i) => {
        return (
          <BoxUserInfo
            key={`${item.loginId}-${i}`}
            datas={[
              { label: t('t232'), value: item.studentName },
              { label: t('t233'), value: item.loginId },
              { label: t('t234'), value: item.registDate },
            ]}
          />
        )
      })}
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
