import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'review_detail_view_reports'

// 상세보기 리포트 리스트
export const DetailedReportsList = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.detailed_reports_list}>{children}</div>
}

// 상세보기 리포트 아이템
export const DetailedReportItem = ({
  imgSrc,
  bookCode,
  title,
  studyDate,
  totalScore,
  isPassed,
  completedInfo,
  earnPoints,
  children,
  onClick,
  studyId,
  studentHistoryId,
  levelRoundId,
  isExportMode,
  isExportChecked,
  isExportCheckable = true,
  onExportCheckedChange,
}: {
  imgSrc: string
  bookCode: string
  title: string
  studyDate: string
  totalScore: number
  isPassed: boolean
  completedInfo: string
  earnPoints: number
  children?: ReactNode
  onClick?: () => void
  studyId: string
  studentHistoryId: string
  levelRoundId: string
  isExportMode?: boolean
  isExportCheckable?: boolean
  isExportChecked?: boolean
  onExportCheckedChange?: (
    key: string,
    item: {
      levelRoundId: string
      isAddable: boolean
      studyId: string
      studentHistoryId: string
    },
    isChecked: boolean,
  ) => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const onCheckedChange = () => {
    isExportCheckable &&
      onExportCheckedChange &&
      onExportCheckedChange(
        studyId,
        { levelRoundId, isAddable: false, studyId, studentHistoryId },
        !isExportChecked,
      )
  }

  return (
    <div
      className={style.detailed_report_item}
      onClick={() => {
        if (!isExportMode) {
          onClick && onClick()
        } else {
          onCheckedChange()
        }
      }}>
      {isExportMode && (
        <div
          style={{
            background: isExportChecked ? 'blue' : 'red',
            width: '24px',
          }}>
          TT
        </div>
      )}
      <div className={style.book_cover}>
        <Image
          alt=""
          src={imgSrc}
          layout="intrinsic"
          width={140}
          height={140}
          style={{ backgroundColor: '#ccc' }}
        />
      </div>
      <div className={`${style.report} ${isPassed ? style.pass : style.fail}`}>
        <div className={style.report_container}>
          <div className={style.col1}>
            <div className={style.book_code}>{bookCode}</div>
            <div className={style.title}>{title}</div>
          </div>
          <div className={style.col2}>
            <div className={style.label}>{t('t539')}</div>
            <div className={style.contents}>{studyDate}</div>
            <div className={style.label}>{t('t540')}</div>
            <div className={style.contents}>{totalScore}</div>
            <div className={style.label}>{t('t140')}</div>
            <div className={style.contents}>
              {isPassed ? 'PASS /' : 'FAIL'} {completedInfo} (
              {isPassed ? '+' + earnPoints + 'P' : 0})
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

// Speak 리포트 리스트
export const SpeakReportsList = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.speak_reports_list}>{children}</div>
}

// Speak 리포트 아이템
export const SpeakReportItem = ({
  imgSrc,
  title,
  bookCode,
  studyDate,
  totalScore,
  isPassed,
  completedInfo,
  earnPoints,
  children,
  onClick,
}: {
  imgSrc: string
  bookCode: string
  title: string
  studyDate: string
  totalScore: number
  isPassed: boolean
  completedInfo: string
  earnPoints: number
  children?: ReactNode
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.speak_report_item}>
      <div
        className={style.book_cover} // onClick={runAssessmentReport}
      >
        <Image
          alt=""
          src={imgSrc}
          layout="intrinsic"
          width={200}
          height={200}
          className={style.book_cover_img}
        />
        {isPassed ? (
          <div className={style.pass_mark}></div>
        ) : (
          <div className={style.fail_mark}></div>
        )}
      </div>
      <div className={style.result}>
        {isPassed ? (
          <div className={style.label}>
            <Image
              alt=""
              src={'/src/images/@review/mic_icon_blue.svg'}
              width={18}
              height={18}
            />
            <div className={style.pass}>PASS</div>
          </div>
        ) : (
          <div className={style.label}>
            <Image
              alt=""
              src={'/src/images/@review/mic_icon_red.svg'}
              width={18}
              height={18}
            />
            <div className={style.fail}>FAIL</div>
          </div>
        )}
      </div>
      <div className={`${style.date} ${isPassed ? style.pass : style.fail}`}>
        {studyDate}
      </div>
      {children}
    </div>
  )
}

// Writing Activity 리포트 리스트
export const WritingReportsList = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.writing_reports_list}>{children}</div>
}

// Writing Activity 리포트 아이템
export const WritingReportItem = ({
  imgSrc,
  bookCode,
  title,
  studyDate,
  totalScore,
  isPassed,
  completedInfo,
  writingScore,
}: {
  imgSrc: string
  bookCode: string
  title: string
  studyDate: string
  totalScore: number
  isPassed: boolean
  completedInfo: string
  writingScore: string
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.writing_report_item}>
      <div className={style.book_cover}>
        <Image
          alt=""
          src={imgSrc}
          layout="intrinsic"
          width={140}
          height={140}
          style={{ backgroundColor: '#ccc' }}
        />
      </div>
      <div className={`${style.report} ${isPassed ? style.pass : style.fail}`}>
        <div className={style.report_container}>
          <div className={style.col1}>
            <div className={style.book_code}>{bookCode}</div>
            <div className={style.title}>{title}</div>
          </div>
          <div className={style.col2}>
            <div className={style.label}>{t('t539')}</div>
            <div className={style.contents}>{studyDate}</div>
            <div className={style.label}>{t('t540')}</div>
            <div className={style.contents}>{totalScore}</div>
            <div className={style.label}>{t('t545')}</div>
            <div className={style.contents}>{completedInfo}</div>
            <div className={style.label}>{t('t546')}</div>
            <div className={style.contents}>{writingScore}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
