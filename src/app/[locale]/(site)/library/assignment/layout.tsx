'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { ReactNode } from 'react'
import { BackLink } from '@/ui/common/common-components'

export default function Layout({ children }: { children?: ReactNode }) {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className="pd-top-m">
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        {t('t376')}
      </BackLink>
      <div className="mg-bottom-m"></div>
      {children}
    </div>
  )
}
