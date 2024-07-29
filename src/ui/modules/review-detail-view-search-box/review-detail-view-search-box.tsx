import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'review_detail_view_search_box'

// 상세보기 리포트 검색박스
export const ReportSearchBox = ({
  startDate,
  endDate,
  isHideKeyword,
  keyword,
  isSearching = false,
  onChangeStartDate,
  onChangeEndDate,
  onChangeKeyword,
  onClickSearch: onClick,
}: {
  startDate: string
  endDate: string
  isHideKeyword: boolean
  keyword?: string
  isSearching?: boolean
  onChangeStartDate?: (date: string) => void
  onChangeEndDate?: (date: string) => void
  onChangeKeyword?: (keyword: string) => void
  onClickSearch?: (startDate: string, endDate: string, keyword?: string) => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [lKeyword, setlKeyword] = useState(keyword || '')
  const [lStartDate, setlStartDate] = useState(startDate)
  const [lEndDate, setlEndDate] = useState(endDate)

  const [isSelectTextField, setIsSelectTextField] = useState(false)

  useEffect(() => {
    setlKeyword(keyword || '')
  }, [keyword])

  useEffect(() => {
    setlStartDate(startDate)
  }, [startDate])

  useEffect(() => {
    setlEndDate(endDate)
  }, [endDate])

  return (
    <div className={style.report_search_box}>
      <div className={style.search_type}>
        <div className={style.txt_label}>{isSelectTextField ? '키워드:' : '기간:'}</div>
        <div className={style.column1}>
          <div className={style.period} onClick={() => {
            isSelectTextField ? setIsSelectTextField(false) : null
          }}>
            <div className={`${style.start_date} ${isSelectTextField ? style.deactive : ''}`}>
              <input
                type="date"
                value={lStartDate}
                onChange={(e) => {
                  const value = e.target.value
                  setlStartDate(value)
                  onChangeStartDate && onChangeStartDate(value)
                }}
              />
            </div>
            <div>~</div>
            <div className={`${style.end_date} ${isSelectTextField ? style.deactive : ''}`}>
              <input
                type="date"
                value={lEndDate}
                onChange={(e) => {
                  const value = e.target.value
                  setlEndDate(value)
                  onChangeEndDate && onChangeEndDate(value)
                }}
              />
            </div>
          </div>

          {isHideKeyword ? (
            <></>
          ) : (
            <div className={`${style.search_bar} ${isSelectTextField ? style.active : ''}`} onClick={() => {
              isSelectTextField ? null : setIsSelectTextField(true)
            }}>
              <input
                type="text"
                placeholder={t('t547')}
                value={isSelectTextField ? lKeyword : ''}
                onChange={(e) => {
                  const value = e.target.value
                  setlKeyword(value)
                  onChangeKeyword && onChangeKeyword(value)
                }}
                onKeyDown={(e) => {
                  if (lKeyword.trim().length <= 0) {
                    return
                  }
                  if (e.key.toLowerCase() === 'enter') {
                    e.currentTarget?.blur()
                    onClick && onClick(lStartDate, lEndDate, lKeyword)
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          if (!isSearching) {
            onClick && onClick(lStartDate, lEndDate, lKeyword)
          }
        }}
        className={style.search_button}>
        <Image
          alt=""
          src="/src/images/search-icons/search_white.svg"
          width={20}
          height={20}
        />
        <span className={style.button_text}>{t('t263')}</span>
      </button>
    </div>
  )
}
