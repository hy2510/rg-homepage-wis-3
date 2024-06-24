'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { BackLink, Margin, Nav, NavItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_rg_news'

export default function Layout({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()
  const connectNotice = pathname.indexOf('notice') != -1
  const connectNewsletter = pathname.indexOf('newsletter') != -1
  const connectNewContents = pathname.indexOf('new-contents') != -1
  const connectInfographic = pathname.indexOf('infographic') != -1
  const connectChallenge = pathname.indexOf('challenge') != -1
  const connectSuperstar = pathname.indexOf('superstar') != -1
  const connectCampaign = pathname.indexOf('campaign') != -1

  return (
    <main className="container compact">
      <BackLink href={SITE_PATH.HOME.MAIN} largeFont colorWhite>
        {t('t326')}
      </BackLink>
      <Margin height={30} />
      <div className={style.rg_news}>
        <Nav>
          <Link href={SITE_PATH.HOME.NOTICE}>
            <NavItem active={connectNotice}>{t('t325')}</NavItem>
          </Link>
          <Link href={SITE_PATH.HOME.NEWS_LETTER}>
            <NavItem active={connectNewsletter}>{t('t327')}</NavItem>
          </Link>
          <Link href={SITE_PATH.HOME.NEW_CONTENTS}>
            <NavItem active={connectNewContents}>{t('t328')}</NavItem>
          </Link>
          <Link href={SITE_PATH.HOME.INFOGRAPHIC}>
            <NavItem active={connectInfographic}>{t('t329')}</NavItem>
          </Link>
          <Link href={SITE_PATH.HOME.EVENT_CHALLENGE}>
            <NavItem active={connectChallenge}>{t('t330')}</NavItem>
          </Link>
          <Link href={SITE_PATH.HOME.EVENT_SUPERSTAR}>
            <NavItem active={connectSuperstar}>{t('t331')}</NavItem>
          </Link>
          <Link href={SITE_PATH.HOME.EVENT_READING_CAMPAIN}>
            <NavItem active={connectCampaign}>{t('t332')}</NavItem>
          </Link>
        </Nav>
        {children}
      </div>
    </main>
  )
}
