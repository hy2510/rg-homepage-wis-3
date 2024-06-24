'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import {
  NavBar,
  NavItem,
} from '@/ui/modules/home-customer-review-components/nav-bar'

const STYLE_ID = 'page_customer_review'

export default function Layout({ children }: { children?: React.ReactNode }) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)
  const pathname = usePathname()

  return (
    <main className={`${style.customer_review} container`}>
      <NavBar>
        {/* <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.CUSTOMER_INTERVIEW) != -1}
          href={SITE_PATH.HOME.CUSTOMER_INTERVIEW}>
          {t('t313')}
        </NavItem>
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.CUSTOMER_INTERVIEW) != -1}
          href={SITE_PATH.HOME.CUSTOMER_INTERVIEW}>
          {t('t314')}
        </NavItem> */}
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.CUSTOMER_INTERVIEW) != -1}
          href={SITE_PATH.HOME.CUSTOMER_INTERVIEW}>
          {t('t315')}
        </NavItem>
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.SNS_REVIEW) != -1}
          href={SITE_PATH.HOME.SNS_REVIEW}>
          {t('t316')}
        </NavItem>
      </NavBar>
      <div className={style.contents_box}>{children}</div>
    </main>
  )
}
