'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useMemo, useState } from 'react'
import { useFetchSpeakReport } from '@/client/store/history/speak/hook'
import { useHistorySpeak } from '@/client/store/history/speak/selector'
import {
  useFetchStudyReport,
  useOnLoadStudyReport,
} from '@/client/store/history/study/hook'
import { useHistoryStudy } from '@/client/store/history/study/selector'
import { useStudentHistory } from '@/client/store/student/history/selector'
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
  DetailedReportItem,
  DetailedReportsList,
  SpeakReportItem,
  SpeakReportsList,
  WritingReportItem,
  WritingReportsList,
} from '@/ui/modules/review-detail-view-reports/review-detail-view-reports'
import { ReportSearchBox } from '@/ui/modules/review-detail-view-search-box/review-detail-view-search-box'
import StudentHistorySelectModal from '../../library/_cpnt/StudentHistorySelectModal'
import useExport, {
  ExportAction,
  useSupportExportActionReport,
} from '../../library/_fn/use-export'

const STYLE_ID = 'page_detailed_view'

export default function Page() {
  const { loading } = useOnLoadStudyReport()

  if (loading) {
    return <LoadingScreen />
  }
  return <HistoryLayout />
}

function HistoryLayout() {
  const style = useStyle(STYLE_ID)

  const option = useHistoryStudy().basic.option

  const { fetch: fetchReport, loading: isReportLoading } = useFetchStudyReport()
  const { fetch: fetchSpeaking } = useFetchSpeakReport()

  const [view, setView] = useState<'read' | 'speak' | 'write'>('read')
  const [startDate, setStartDate] = useState<{
    year: number
    month: number
    day: number
  }>({ ...option.startDate })
  const [endDate, setEndDate] = useState<{
    year: number
    month: number
    day: number
  }>({ ...option.endDate })
  const [keyword, setKeyword] = useState(option.keyword || '')

  const startDateText = `${startDate.year}-${
    startDate.month > 9 ? startDate.month : `0${startDate.month}`
  }-${startDate.day > 9 ? startDate.day : `0${startDate.day}`}`
  const endDateText = `${endDate.year}-${
    endDate.month > 9 ? endDate.month : `0${endDate.month}`
  }-${endDate.day > 9 ? endDate.day : `0${endDate.day}`}`

  const isHideKeyword = view === 'speak'

  return (
    <main className={style.detailed_view}>
      <ReportSearchBox
        startDate={startDateText}
        endDate={endDateText}
        isHideKeyword={isHideKeyword}
        keyword={isHideKeyword ? '' : keyword}
        isSearching={isReportLoading}
        onChangeStartDate={(date) => {
          const startDate = {
            year: Number(date.substring(0, 4)),
            month: Number(date.substring(5, 7)),
            day: Number(date.substring(8, 10)),
          }
          setStartDate(startDate)
        }}
        onChangeEndDate={(date) => {
          const endDate = {
            year: Number(date.substring(0, 4)),
            month: Number(date.substring(5, 7)),
            day: Number(date.substring(8, 10)),
          }
          setEndDate(endDate)
        }}
        onChangeKeyword={(text) => {
          setKeyword(text)
        }}
        onClickSearch={(startDt, endDt, text) => {
          const startDateSerial = {
            year: Number(startDt.substring(0, 4)),
            month: Number(startDt.substring(5, 7)),
            day: Number(startDt.substring(8, 10)),
          }
          const endDateSerial = {
            year: Number(endDt.substring(0, 4)),
            month: Number(endDt.substring(5, 7)),
            day: Number(endDt.substring(8, 10)),
          }
          const isReverseDate =
            Number(
              startDt.substring(0, 4) +
                startDt.substring(5, 7) +
                startDt.substring(8, 10),
            ) >
            Number(
              endDt.substring(0, 4) +
                endDt.substring(5, 7) +
                endDt.substring(8, 10),
            )
          const startDate = isReverseDate ? endDateSerial : startDateSerial
          const endDate = isReverseDate ? startDateSerial : endDateSerial

          const isChangeDate =
            startDate.year !== option.startDate.year ||
            startDate.month !== option.startDate.month ||
            startDate.day !== option.startDate.day ||
            endDate.year !== option.endDate.year ||
            endDate.month !== option.endDate.month ||
            endDate.day !== option.endDate.day
          const currentKeyword = option.keyword || ''
          if (isChangeDate || text !== currentKeyword) {
            if (view === 'read') {
              fetchReport({
                startDate,
                endDate,
                keyword: text,
                status: 'All',
              })
              setStartDate(startDate)
              setEndDate(endDate)
              setKeyword(text || '')
            } else if (view === 'write') {
              fetchReport({
                startDate,
                endDate,
                keyword: text,
                status: 'Writing',
              })
              setStartDate(startDate)
              setEndDate(endDate)
              setKeyword(text || '')
            } else if (view === 'speak') {
              if (isChangeDate) {
                fetchSpeaking({
                  startDate,
                  endDate,
                  status: 'All',
                  isSyncStudyDate: true,
                })
                setStartDate(startDate)
                setEndDate(endDate)
              }
            }
          }
        }}
      />
      <div className={style.top}>
        <Dropdown
          title={
            view === 'read'
              ? 'My Read'
              : view === 'speak'
                ? 'My Speak'
                : 'Writing Activity'
          }>
          <DropdownItem
            onClick={() => {
              if (view !== 'read') {
                fetchReport({
                  startDate: option.startDate,
                  endDate: option.endDate,
                  keyword: '',
                  status: 'All',
                })
                setView('read')
                setStartDate(option.startDate)
                setEndDate(option.endDate)
                setKeyword('')
              }
            }}>
            My Read
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              if (view !== 'speak') {
                fetchSpeaking({
                  startDate: option.startDate,
                  endDate: option.endDate,
                  status: 'All',
                })
                setView('speak')
                setStartDate(option.startDate)
                setEndDate(option.endDate)
              }
            }}>
            My Speak
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              if (view !== 'write') {
                fetchReport({
                  startDate: option.startDate,
                  endDate: option.endDate,
                  keyword: '',
                  status: 'Writing',
                })
                setView('write')
                setStartDate(option.startDate)
                setEndDate(option.endDate)
                setKeyword('')
              }
            }}>
            Writing Activity
          </DropdownItem>
        </Dropdown>
        {view == 'read' && <div className={style.days}>학습일수 00 days</div>}
      </div>
      {view === 'read' && <ReadList />}
      {view === 'speak' && <SpeakList />}
      {view === 'write' && <WriteList />}
    </main>
  )
}

function ReadList() {
  // @Language 'common'
  const { t } = useTranslation()

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')

  const historyStudy = useHistoryStudy().basic.payload
  const history = historyStudy.history

  const allCount = history.length
  const { passedCount, earnPoints } = useMemo(() => {
    let passedCount = 0
    let earnPoints = 0.0
    history.forEach((item) => {
      if (item.average >= 70) {
        passedCount++
        earnPoints += item.rgPoint
      }
    })
    return {
      passedCount,
      earnPoints: Math.round(earnPoints * 10) / 10,
    }
  }, [history])
  const failedCount = allCount - passedCount

  const list = history.filter((item) => {
    if (tab === 'passed') {
      return item.average >= 70
    } else if (tab === 'failed') {
      return item.average < 70
    } else {
      return true
    }
  })

  const [selectedBookInfo, setSelectBookInfo] = useState<string | undefined>(
    undefined,
  )

  const studentHistoryList = useStudentHistory().payload.map((history) => ({
    studentHistoryId: history.studentHistoryId,
    classId: history.classId,
    className: history.className,
  }))
  const studentHistoryId = useStudentHistory().defaultHistoryId

  const {
    isSelectMode,
    setSelectMode,
    selectedItemCount,
    isSelectedItem,
    setItemSelectedChange,
    onExportAction,
    isSelectStudentHistory,
    onSelectStudentHistory,
    onExportCancel,
  } = useExport({
    studentHistoryId:
      studentHistoryList.length === 1 ? studentHistoryId : undefined,
  })

  const supportExportAction = useSupportExportActionReport()

  const [exportSelected, setExportSelected] = useState<
    ExportAction | undefined
  >(
    supportExportAction && supportExportAction.length > 0
      ? supportExportAction[0].action
      : undefined,
  )

  const downloadExcelUrl = allCount > 0 ? historyStudy.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      window.open(downloadExcelUrl)
    }
  }

  const performanceReportUrl = historyStudy.performanceReport
  const onPerformanceReportUrl = () => {
    if (performanceReportUrl) {
      window.open(performanceReportUrl)
    }
  }

  // TODO : 개발용 Flag.  Export, Download 작업 개발:
  const isDevAction = false

  const style = useStyle(STYLE_ID)

  const t415 = t('t415')

  return (
    <>
      <Pills>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px'}}>
          <div style={{display: 'flex', gap: '15px'}}>
            <PillItem
              active={tab === 'all'}
              onClick={() => {
                setTab('all')
              }}>
              {t('t412', { num: allCount })}
            </PillItem>
            <PillItem
              active={tab === 'passed'}
              onClick={() => {
                setTab('passed')
              }}>
              {t('t416', { num1: passedCount, num2: earnPoints })}
            </PillItem>
            <PillItem
              active={tab === 'failed'}
              onClick={() => {
                setTab('failed')
              }}>
              {t('t414', { num: failedCount })}
            </PillItem>
          </div>
          { history.length !== 0 && <div className={style.performance_link} onClick={onPerformanceReportUrl}>Performance</div> }
        </div>
      </Pills>
      <div
        onClick={() => {
          setSelectMode(!isSelectMode)
        }}>
        {isDevAction && (isSelectMode ? t('t204') : t('t372'))}
        {isSelectMode && (
          <div>
            {supportExportAction.map((item) => {
              return (
                <button
                  key={item.action}
                  onClick={(e) => {
                    e.stopPropagation()
                    setExportSelected(item.action)
                  }}>
                  {`[${exportSelected === item.action ? 'O' : '_'}]`}
                  {item.label}
                </button>
              )
            })}
            <div
              onClick={(e) => {
                e.stopPropagation()
                if (exportSelected) {
                  onExportAction && onExportAction(exportSelected)
                }
              }}>
              DO Action
            </div>
          </div>
        )}
        {isDevAction && downloadExcelUrl && (
          <div onClick={onBookListExcelDownload}>엑셀다운로드</div>
        )}
        {isDevAction && performanceReportUrl && (
          <div onClick={onPerformanceReportUrl}>퍼포먼스 리포트</div>
        )}
      </div>
      {!list || list.length === 0 ? (
        <EmptyMessage><div dangerouslySetInnerHTML={{__html: t415}}></div></EmptyMessage>
      ) : (
        <DetailedReportsList>
          {list.map((book, i) => {
            const isCheckable = true
            const isChecked = isSelectedItem(book.studyId)
            const onCheckedChange = setItemSelectedChange

            return (
              <DetailedReportItem
                key={`history_${book.completeDate}_${book.bookId}_${i}`}
                title={book.title}
                bookCode={book.levelName}
                isPassed={book.average > 70}
                imgSrc={book.surfaceImagePath}
                studyDate={book.completeDate}
                totalScore={book.average}
                completedInfo={book.fullEasyName}
                earnPoints={book.rgPoint}
                onClick={() => {
                  setSelectBookInfo(book.studyId)
                }}
                studyId={book.studyId}
                studentHistoryId={book.studentHistoryId}
                levelRoundId={book.levelRoundId}
                isExportMode={isSelectMode}
                isExportChecked={isChecked}
                isExportCheckable={isCheckable}
                onExportCheckedChange={onCheckedChange}>
                {selectedBookInfo && selectedBookInfo === book.studyId && (
                  <ReviewAssessmentReport
                    studyId={book.studyId}
                    studentHistoryId={book.studentHistoryId}
                    levelRoundId={book.levelRoundId}
                    title={book.title}
                    bookImgSrc={book.surfaceImagePath}
                    bookCode={book.levelName}
                    studyDate={book.completeDate}
                    totalScore={book.average}
                    isPassed={book.average > 70}
                    completedInfo={book.fullEasyName}
                    earnPoints={book.rgPoint}
                    onClickDelete={() => {
                      setSelectBookInfo(undefined)
                    }}
                  />
                )}
              </DetailedReportItem>
            )
          })}
        </DetailedReportsList>
      )}
      {isSelectStudentHistory && (
        <StudentHistorySelectModal
          studentHistoryList={studentHistoryList}
          defaultStudentHistoryId={studentHistoryId}
          onCloseModal={onExportCancel}
          onSelectStudentHistoryId={onSelectStudentHistory}
        />
      )}
      {/* <Pagination>
        <PaginationItem active={true}>1</PaginationItem>
      </Pagination> */}
    </>
  )
}

function WriteList() {
  // @Language 'common'
  const { t } = useTranslation()

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')

  const historyStudy = useHistoryStudy().basic.payload
  const history = historyStudy.history

  const allCount = history.length
  const { passedCount, earnPoints } = useMemo(() => {
    let passedCount = 0
    let earnPoints = 0.0
    history.forEach((item) => {
      if (item.average >= 70) {
        passedCount++
        earnPoints += item.rgPoint
      }
    })
    return {
      passedCount,
      earnPoints,
    }
  }, [history])
  const failedCount = allCount - passedCount

  const list = history.filter((item) => {
    if (tab === 'passed') {
      return item.average >= 70
    } else if (tab === 'failed') {
      return item.average < 70
    } else {
      return true
    }
  })

  return (
    <>
      <Pills>
        <PillItem
          active={tab === 'all'}
          onClick={() => {
            setTab('all')
          }}>
          {t('t412', { num: allCount })}
        </PillItem>
        <PillItem
          active={tab === 'passed'}
          onClick={() => {
            setTab('passed')
          }}>
          {t('t413', { num: passedCount })}
        </PillItem>
        <PillItem
          active={tab === 'failed'}
          onClick={() => {
            setTab('failed')
          }}>
          {t('t414', { num: failedCount })}
        </PillItem>
      </Pills>
      <WritingReportsList>
        {list.map((a, i) => {
          let statusInfo = '-'
          if (a.revisionStatusCode === '028009') {
            statusInfo = 'Comp. R'
          } else if (a.revisionStatusCode === '028003') {
            statusInfo = 'On Revision'
          }
          return (
            <WritingReportItem
              key={`history_${a.completeDate}_${a.bookId}_${i}`}
              title={a.title}
              bookCode={a.levelName}
              isPassed={a.average > 70}
              imgSrc={a.surfaceImagePath}
              studyDate={a.completeDate}
              totalScore={a.average}
              completedInfo={statusInfo}
              writingScore={a.scoreStep5 ? a.scoreStep5.toString() : '-'}
            />
          )
        })}
      </WritingReportsList>
      {/* <Pagination>
        <PaginationItem active={true}>1</PaginationItem>
      </Pagination> */}
    </>
  )
}

function SpeakList() {
  // @Language 'common'
  const { t } = useTranslation()

  const history = useHistorySpeak().payload

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')
  const allCount = history.length
  const { passedCount, earnPoints } = useMemo(() => {
    let passedCount = 0
    let earnPoints = 0.0
    history.forEach((item) => {
      if (item.speakPassYn) {
        passedCount++
      }
    })
    return {
      passedCount,
      earnPoints,
    }
  }, [history])
  const failedCount = allCount - passedCount

  const list = history.filter((item) => {
    if (tab === 'passed') {
      return item.speakPassYn
    } else if (tab === 'failed') {
      return !item.speakPassYn
    } else {
      return true
    }
  })

  return (
    <>
      <Pills>
        <PillItem active={tab === 'all'} onClick={() => setTab('all')}>
          {t('t412', { num: allCount })}
        </PillItem>
        <PillItem active={tab === 'passed'} onClick={() => setTab('passed')}>
          {t('t413', { num: passedCount })}
        </PillItem>
        <PillItem active={tab === 'failed'} onClick={() => setTab('failed')}>
          {t('t414', { num: failedCount })}
        </PillItem>
      </Pills>
      <SpeakReportsList>
        {list.map((a, i) => {
          return (
            <SpeakReportItem
              key={`speak-item-${a.levelName}-${i}`}
              imgSrc={a.surfaceImagePath}
              bookCode={a.levelName}
              title={a.title}
              studyDate={a.completeDate}
              totalScore={a.average}
              isPassed={a.speakPassYn}
              completedInfo={''}
              earnPoints={a.rgPoint}
            />
          )
        })}
      </SpeakReportsList>
      {/* <Pagination>
        <PaginationItem active={true}>1</PaginationItem>
      </Pagination> */}
    </>
  )
}
