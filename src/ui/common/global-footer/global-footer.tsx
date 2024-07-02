'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'global_footer'

// 공통하단
export default function Gfooter() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.g_footer}>
      <div className="container">
        {/* <div className={style.row_a}>
          <span>{t('t321')}</span>
          <span>{'1599-0533'}</span>
        </div> */}
        <div className={style.row_b}>
          <div>{t('t028')}</div>
          <div>{t('t029')}</div>
          {/* <div>{t('t030')}</div> */}
          <div>{t('t297')}</div>
          <div>{t('t419')}</div>
          <div>{t('t420')}</div>
        </div>
        <div className={style.row_c}>
          <div>{t('t421')}</div>
          <br />
          <div>{t('t422')}</div>
        </div>
      </div>
    </div>
  )
}
