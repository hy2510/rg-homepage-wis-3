'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_welcome'

export default function Welcome() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const student = useStudentInfo().payload

  const router = useRouter()
  return (
    <div className={style.sign_up_box}>
      <main className={style.welcome}>
        <div className={style.txt_title}>{t('t306')}</div>
        <div className={style.txt_sub_title}>{t('t307')}</div>
        <div className={style.member_info_box}>
          <div>{t('t232')}</div>
          <div>{student.name}</div>
          <div>{t('t308')}</div>
          <div>{student.loginId}</div>
          <div>{t('t234')}</div>
          <div>{student.registDate.substring(0, 10)}</div>
          <div>{t('t051')}</div>
          <div>{t('t052', { num: student.studyEndDay })}</div>
        </div>
        <div className={style.comment}>
          <span>{`* ${t('t309')}`}</span>
          <span
            style={{ color: '#0062e3', cursor: 'pointer', fontWeight: '500' }}
            onClick={() => {
              router.replace(SITE_PATH.ACCOUNT.MAIN)
            }}>
            {t('t310')}
          </span>
        </div>

        <Button
          shadow
          onClick={() => {
            router.replace(SITE_PATH.LIBRARY.HOME)
          }}>
          {t('t311')}
        </Button>
        <div className={style.link_button_container}>
          <div
            className={style.link_button}
            onClick={() => {
              router.replace(SITE_PATH.HOME.MAIN)
            }}>
            {t('t312')}
          </div>
        </div>
      </main>
    </div>
  )
}
