import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'todo_list'
// 학습메인 > 사용자의 진행중인 학습 리스트
export function ExpTodoList({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.todo_list}>
      <div className={style.txt_h}>{t('t376')}</div>
      <div className={style.row}>
        {children}
        <Link href={SITE_PATH.LIBRARY.TODO} className={style.more_button}>
          {t('t510')}
        </Link>
      </div>
    </div>
  )
}
