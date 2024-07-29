'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import {
  useStudentInfo,
  useStudentIsLogin,
} from '@/client/store/student/info/selector'
import { AlertBar } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_home'

export default function Layout({ children }: { children?: ReactNode }) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  const pathname = usePathname()
  const connectMainRgNews = pathname.indexOf('/rg-news') != -1

  const HomeNavItem = ({
    name,
    href,
    target,
    active,
    onClick,
  }: {
    name: string
    href: string
    target?: string
    active?: boolean
    onClick?: () => void
  }) => {
    return (
      <Link href={href} target={target ? target : '_self'} onClick={onClick}>
        <div className={`${style.home_nav_item} ${active ? style.active : ''}`}>
          {name}
        </div>
      </Link>
    )
  }

  const HomeNavBar = () => {
    return (
      <div className={`${style.home_nav_bar}`}>
        <HomeNavItem
          name={t('t317')}
          href={SITE_PATH.HOME.MAIN}
          active={pathname.indexOf(SITE_PATH.HOME.MAIN) !== -1}
        />
        {/* <HomeNavItem
          name={t('t318')}
          href={'hall-of-fame'}
          active={connectHallOfFame}
        /> */}
        <HomeNavItem
          name={t('t319')}
          href={SITE_PATH.HOME.CUSTOMER_INTERVIEW}
          active={pathname.indexOf('/customer-review') !== -1}
        />
        <HomeNavItem
          name={t('t320')}
          href={SITE_PATH.HOME.MEMBERSHIP_INTRODUCE}
          active={pathname.indexOf('/rg-membership') !== -1}
        />
        <HomeNavItem
          name={t('t321')}
          href={
            'https://ossified-smell-f52.notion.site/RG-f84a3437f61748afb4f050afa39a480c'
          }
          active={false}
          target={'_blank'}
        />
      </div>
    )
  }

  const isLogin = useStudentIsLogin()
  const studyEndDay = useStudentInfo().payload.studyEndDay
  const paymentMessage =
    studyEndDay <= 0 ? `${t('t322')}` : `${t('t323', { num: studyEndDay })}`

  return (
    <div className={style.home}>
        {isLogin && studyEndDay <= 7 && (
          <div className="container" style={{ paddingBottom: 0, paddingTop: 20, }}>
            <AlertBar>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  color: 'red',
                }}>
                <div>{paymentMessage}</div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    // TODO - 결제
                  }}>
                  <b>{t('t193')}</b>
                </div>
              </div>
            </AlertBar>
          </div>
        )}
      {connectMainRgNews ? <></> : <HomeNavBar />}
      {children}
    </div>
  )
}
