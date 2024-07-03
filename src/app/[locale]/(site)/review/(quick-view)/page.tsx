'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useMemo, useState } from 'react'
import {
  useFetchStudyReportRange,
  useOnLoadStudyReport,
} from '@/client/store/history/study/hook'
import { useHistoryStudy } from '@/client/store/history/study/selector'
import {
  Dropdown,
  DropdownItem,
  EmptyMessage,
  PillItem,
  Pills,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { ReviewAssessmentReport } from '@/ui/modules/review-assessment-report/ReviewAssessmentReport'
import {
  QuickReportItem,
  QuickReportsList,
} from '@/ui/modules/review-quick-view-reports/QuickReportItem'

const STYLE_ID = 'page_quick_view'

export default function Page() {
  const { loading } = useOnLoadStudyReport()

  if (loading) {
    return <LoadingScreen />
  }
  return <HistoryLayout />
}

function HistoryLayout() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const history = useHistoryStudy().simple.payload.history
  const option = useHistoryStudy().simple.option

  const { fetch } = useFetchStudyReportRange()

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')

  const allCount = history.length
  const passedCount = useMemo(() => {
    let count = 0
    history.forEach((item) => {
      if (item.average >= 70) {
        count++
      }
    })
    return count
  }, [history])
  const failedCount = allCount - passedCount

  const [range, setRange] = useState(option.range)
  const onRangeChange = (range: 7 | 14 | 30) => {
    setRange(range)
    fetch({ range, status: option.status })
  }

  const [selectedBookInfo, setSelectBookInfo] = useState<string | undefined>(
    undefined,
  )

  const historyStudy = useHistoryStudy().basic.payload
  const performanceReportUrl = historyStudy.performanceReport
  const onPerformanceReportUrl = () => {
    if (performanceReportUrl) {
      window.open(performanceReportUrl)
    }
  }
  const t415 = t('t415')

  return (
    <main className={style.quick_view}>
      <div className={style.top}>
        <Dropdown title={t('t408', { num: range })}>
          <DropdownItem onClick={() => onRangeChange(7)}>
            {t('t408', { num: 7 })}
          </DropdownItem>
          <DropdownItem onClick={() => onRangeChange(14)}>
            {t('t408', { num: 14 })}
          </DropdownItem>
          <DropdownItem onClick={() => onRangeChange(30)}>
            {t('t408', { num: 30 })}
          </DropdownItem>
        </Dropdown>
      </div>
      <div>
        <div className={style.days}>
          <div className={style.days_data}>• 학습일수 00 days</div>
        </div>
        <Pills>
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px'}}>
            <div style={{display: 'flex', gap: '15px'}}>
              <PillItem active={tab === 'all'} onClick={() => setTab('all')}>
                {`${t('t412', { num: allCount })}`}
              </PillItem>
              <PillItem active={tab === 'passed'} onClick={() => setTab('passed')}>
                {`${t('t413', { num: passedCount })}`}
              </PillItem>
              <PillItem active={tab === 'failed'} onClick={() => setTab('failed')}>
                {`${t('t414', { num: failedCount })}`}
              </PillItem>
            </div>
            { history.length !== 0 && <div className={style.performance_link} onClick={onPerformanceReportUrl}>Performance</div> }
          </div>
        </Pills>
      </div>
      {!history || history.length === 0 ? (
        <EmptyMessage><div dangerouslySetInnerHTML={{__html: t415}}></div></EmptyMessage>
      ) : (
        <QuickReportsList>
          {history
            .filter((item) => {
              if (tab === 'passed') {
                return item.average >= 70
              } else if (tab === 'failed') {
                return item.average < 70
              } else {
                return <tr></tr>
              }
            })
            .map((a, i) => {
              return (
                <QuickReportItem
                  key={`history_${a.completeDate}_${a.bookId}_${i}`}
                  title={a.title}
                  bookCode={a.levelName}
                  isPassed={a.average > 70}
                  imgSrc={a.surfaceImagePath}
                  studyDate={a.completeDate}
                  totalScore={a.average}
                  completedInfo={a.fullEasyName}
                  earnPoints={a.rgPoint}
                  onClick={() => {
                    setSelectBookInfo(a.studyId)
                  }}>
                  {selectedBookInfo && selectedBookInfo === a.studyId && (
                    <ReviewAssessmentReport
                      studyId={a.studyId}
                      studentHistoryId={a.studentHistoryId}
                      levelRoundId={a.levelRoundId}
                      title={a.title}
                      bookImgSrc={a.surfaceImagePath}
                      bookCode={a.levelName}
                      studyDate={a.completeDate}
                      totalScore={a.average}
                      isPassed={a.average > 70}
                      completedInfo={a.fullEasyName}
                      earnPoints={a.rgPoint}
                      onClickDelete={() => {
                        setSelectBookInfo(undefined)
                      }}
                    />
                  )}
                </QuickReportItem>
              )
            })}
        </QuickReportsList>
      )}
      {/* <Pagination>
        <PaginationItem active={true}>1</PaginationItem>
      </Pagination> */}
    </main>
  )
}
