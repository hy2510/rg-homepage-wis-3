import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BackLink } from '@/ui/common/common-components'

type Step = 1 | 2 | 3
export default function ForgotPasswordSchoolAcademy({
  style,
}: {
  style: Record<string, string>
}) {
  // @language 'common'
  const { t } = useTranslation()
  const [step, setStep] = useState<Step>(1)

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
      <div>{t('t255')}</div>
    </>
  )
}
