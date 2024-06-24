'use client'

import { ExportAction } from '@/app/[locale]/(site)/library/_fn/use-export'
import useTranslation from '@/localization/client/useTranslations'
import { ReactNode, useState } from 'react'
import { Dropdown, DropdownItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import {
  ExportItem,
  ExportModePanel,
} from '../library-export-mode-panel/export-mode-panel'

const STYLE_ID = 'library_find_book_list'

// 학습메인 > 사용자의 학습레벨의 도서 리스트
export function BookList({
  count = 0,
  children,
  supportExportAction,
  isExportMode,
  exportCount,
  onExportClick,
  toggleExportMode,
  onDownloadClick,
}: {
  count?: number
  children?: ReactNode
  supportExportAction?: { action: ExportAction; label: string }[]
  isExportMode?: boolean
  exportCount?: number
  onExportClick?: (mode: ExportAction) => void
  toggleExportMode?: () => void
  onDownloadClick?: () => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [exportSelected, setExportSelected] = useState<
    ExportAction | undefined
  >(
    supportExportAction && supportExportAction.length > 0
      ? supportExportAction[0].action
      : undefined,
  )

  return (
    <>
      <div className="flex dir-col gap-m">
        <div className={style.book_counter}>
          <div className={style.book_counter_container}>
            <Dropdown title={`총 ${count}권`}>
              {onDownloadClick && (
                <DropdownItem onClick={onDownloadClick}>
                  목록 다운로드
                </DropdownItem>
              )}
            </Dropdown>
          </div>
          {count > 0 && (
            <div
              className={style.edit}
              onClick={() => {
                toggleExportMode && toggleExportMode()
              }}>
              {isExportMode ? t('t371') : t('t372')}
            </div>
          )}
        </div>
        <div className={style.book_list}>
          <div className={style.row_b}>{children}</div>
        </div>
      </div>
      {isExportMode && (
        <ExportModePanel
          count={exportCount}
          onExportClick={() => {
            if (exportSelected) {
              onExportClick && onExportClick(exportSelected)
            }
          }}>
          {supportExportAction &&
            supportExportAction.map((mode) => {
              return (
                <ExportItem
                  key={mode.action}
                  active={exportSelected === mode.action}
                  onClick={() => {
                    if (exportSelected !== mode.action) {
                      setExportSelected(mode.action)
                    }
                  }}>
                  {mode.label}
                </ExportItem>
              )
            })}
        </ExportModePanel>
      )}
    </>
  )
}
