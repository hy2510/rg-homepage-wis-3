'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useStyle } from '@/ui/context/StyleContext'
import ForgotIdPrivate from './ForgotIdPrivate'
import ForgotIdSchool from './ForgotIdSchool'

const STYLE_ID = 'page_forgot_id'
export default function ForgotId() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const customer = useCustomerInfo()
  const customerUse = customer.customerUse

  return (
    <div className={style.forgot}>
      <div className={style.forgot_id}>
        {customerUse === 'Private' && <ForgotIdPrivate style={style} />}
        {customerUse === 'School' && <ForgotIdSchool style={style} />}
        {customerUse !== 'Private' && customerUse !== 'School' && (
          <div>{t('t223')}</div>
        )}
      </div>
    </div>
  )
}
