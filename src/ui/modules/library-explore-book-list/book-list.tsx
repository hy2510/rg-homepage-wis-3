import useTranslation from '@/localization/client/useTranslations'
import { ReactNode } from 'react'
import { AlertBar, EmptyMessage } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LibrarySearchFilter, {
  LibraryFilterOption,
} from '../library-set-fliter/LibrarySearchFilter'

const STYLE_ID = 'library_explore_book_list'
// 학습메인 > 사용자의 학습레벨의 도서 리스트
export function BookList({
  value = 0,
  max = 0,
  title,
  alertMessage,
  filterOption,
  onChangeFilterOption,
  children,
  bookCount,
}: {
  value: number
  max: number
  title?: string
  alertMessage?: string
  filterOption: LibraryFilterOption[]
  onChangeFilterOption?: (filterOption: LibraryFilterOption[]) => void
  children?: ReactNode
  bookCount?: number
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const t496 = t('t496')

  return (
    <div className={style.book_list}>
      <div className={style.row_a}>
        <div className={style.row_a_container}>
          <div className={style.txt_h}>{title}</div>
          <div className={style.completed_status}>
            <div className={style.txt_l1}>{value}</div>
            <div className={style.txt_l2}>/{max}</div>
          </div>
        </div>
        <LibrarySearchFilter
          optionList={filterOption}
          onOptionChange={onChangeFilterOption}
        />
      </div>
      {alertMessage && <AlertBar>{alertMessage}</AlertBar>}
      {bookCount == 0 ? (
        <EmptyMessage><div dangerouslySetInnerHTML={{__html: t496}}></div></EmptyMessage>
      ) : (
        <div className={style.row_b}>{children}</div>
      )}
    </div>
  )
}
