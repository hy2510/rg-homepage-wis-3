'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import {
  NavBar,
  NavItem,
} from '@/ui/modules/home-rg-membership-components/nav-bar'

const STYLE_ID = 'page_rg_membership'

export default function Layout({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  //// @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()

  return (
    <main className={`${style.rg_membership} container`}>
      <NavBar>
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_INTRODUCE) != -1}
          href={SITE_PATH.HOME.MEMBERSHIP_INTRODUCE}>
          {t('t335')}
        </NavItem>
        {/* <NavItem active={false}>멤버십 구매</NavItem> */}
        <NavItem
          active={
            pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_REFUND_POLICY) != -1
          }
          href={SITE_PATH.HOME.MEMBERSHIP_REFUND_POLICY}>
          {t('t336')}
        </NavItem>
        <NavItem
          active={
            pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_SERVICE_TERM) != -1
          }
          href={SITE_PATH.HOME.MEMBERSHIP_SERVICE_TERM}>
          {t('t297')}
        </NavItem>
        <NavItem
          active={
            pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_PRIVACY_POLICY) != -1
          }
          href={SITE_PATH.HOME.MEMBERSHIP_PRIVACY_POLICY}>
          {t('t299')}
        </NavItem>
      </NavBar>
      <div className={style.contents_box}>{children}</div>
    </main>
  )
}
