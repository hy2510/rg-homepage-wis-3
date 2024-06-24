'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useStyle } from '@/ui/context/StyleContext'
import ForgotPasswordPrivate from './ForgotPasswordPrivate'
import ForgotPasswordSchoolAcademy from './ForgotPasswordSchoolAcademy'

const STYLE_ID = 'page_forgot_password'

export default function ForgotPassword() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const customer = useCustomerInfo()
  const customerUse = customer.customerUse

  return (
    <div className={style.forgot}>
      <main className={style.forgot_password}>
        {customerUse === 'Private' && <ForgotPasswordPrivate style={style} />}
        {(customerUse === 'School' || customerUse === 'Academy') && (
          <ForgotPasswordSchoolAcademy style={style} />
        )}
        {customerUse !== 'Private' &&
          customerUse !== 'School' &&
          customerUse !== 'Academy' && <div>{t('t238')}</div>}
      </main>
    </div>
  )
}
