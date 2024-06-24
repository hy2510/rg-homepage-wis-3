'use client'

// @Deprecate('Not Used')
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import { ReviewAssessmentReport } from '../review-assessment-report/review-assessment-report'

const STYLE_ID = 'quick_view_reports'

// 간편보기 리포트 리스트
export const QuickReportsList = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.quick_reports_list}>{children}</div>
}

// 간편보기 리포트 아이템
export const QuickReportItem = ({
  imgSrc,
  title,
  bookCode,
  studyDate,
  totalScore,
  isPassed,
  completedInfo,
  earnPoints,
}: {
  imgSrc: string
  title: string
  bookCode: string
  studyDate: string
  totalScore: number
  isPassed: boolean
  completedInfo: string
  earnPoints: number
}) => {
  const style = useStyle(STYLE_ID)

  const [viewAssessment, _viewAssessment] = useState(false)
  const runAssessmentReport = () => {
    _viewAssessment(true)
  }
  const hideAssessReport = () => {
    _viewAssessment(false)
  }

  return (
    <div className={style.quick_report_item}>
      <div className={style.book_cover} onClick={runAssessmentReport}>
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
          <div className={style.pass}>PASS</div>
        ) : (
          <div className={style.fail}>FAIL</div>
        )}
      </div>
      <div className={`${style.date} ${isPassed ? style.pass : style.fail}`}>
        {studyDate}
      </div>
      {viewAssessment && (
        <ReviewAssessmentReport
          title={title}
          bookImgSrc={imgSrc}
          bookCode={bookCode}
          studyDate={studyDate}
          totalScore={totalScore}
          isPassed={isPassed}
          completedInfo={completedInfo}
          earnPoints={earnPoints}
          _viewAssessment={_viewAssessment}
          onClickDelete={() => {
            _viewAssessment(false)
          }}
        />
      )}
    </div>
  )
}
