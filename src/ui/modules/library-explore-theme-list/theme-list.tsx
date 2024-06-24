import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { AlertBar } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'theme_list'
// 학습메인 > 사용자의 학습레벨의 주제 리스트
export function ThemeList({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.theme_list}>
      <div className={style.txt_h}>{t('t508')}</div>
      <AlertBar>{t('t509')}</AlertBar>
      <div className={style.theme_list_container}>{children}</div>
    </div>
  )
}

// 학습메인 > 사용자의 학습레벨의 주제 아이템
export function ThemeListItem({
  themeImgSrc,
  title,
  onClick,
}: {
  themeImgSrc: string
  title?: string
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <Link
      href={'#'}
      onClick={(e) => {
        e.preventDefault()
        onClick && onClick()
      }}>
      <div className={style.theme_list_item}>
        <div className={style.txt_title}>{title}</div>
        <Image
          alt=""
          src={themeImgSrc}
          layout="intrinsic"
          width={400}
          height={200}
        />
      </div>
    </Link>
  )
}
