'use client'

import useTranslation from '@/localization/client/useTranslations'
import { ReactNode } from 'react'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'export_mode_panel'

// 내보내기(일괄작업) 콘테이너
export const ExportModePanel = ({
  children,
  buttonName,
  count = 0,
  onExportClick,
}: {
  children?: ReactNode
  buttonName?: string
  count?: number
  onExportClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={`${style.export_mode_panel} ${style.bounce_top}`}>
      <div className={style.export_mode_panel_container}>
        {/* <div>이호열반</div> */}
        <div className={style.selected_books}>
          {t('t511')} {count}
        </div>
        <div className={style.export_items}>
          {children && (
            <div className={style.export_items_container}>{children}</div>
          )}
          <Button
            shadow
            roundFull
            color={count > 0 ? 'red' : 'gray'}
            onClick={onExportClick}>
            {buttonName ? buttonName : t('t372')}
          </Button>
        </div>
      </div>
    </div>
  )
}

// 내보내기(일괄작업) 아이템
export const ExportItem = ({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children?: ReactNode
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.export_item} ${active && style.active}`}
      onClick={onClick}>
      {children}
    </div>
  )
}
