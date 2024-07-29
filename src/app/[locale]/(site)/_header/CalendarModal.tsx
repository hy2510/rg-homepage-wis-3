'use client'

import '@/ui/common/global-option-calendar/global-option-calendar.scss'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { ReactNode, useMemo, useState } from 'react'
import {
  useFetchAttendCalendar,
  useOnLoadAttendCalendar,
} from '@/client/store/calendar/attend/hook'
import { useCalendarAttend } from '@/client/store/calendar/attend/selector'
import {
  useFetchStudyCalendar,
  useOnLoadStudyCalendar,
} from '@/client/store/calendar/study/hook'
import { useCalendarStudy } from '@/client/store/calendar/study/selector'
import { useStudentDailyLearning } from '@/client/store/student/daily-learning/selector'
import { Modal, Nav, NavItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'global_option_calendar'

// 캘린더 모달
export function CalendarModal({
  _viewCalendarModal,
}: {
  _viewCalendarModal: (isShow: boolean) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const { loading: attendLoading } = useOnLoadAttendCalendar()
  const { loading: studyLoading } = useOnLoadStudyCalendar()

  const loading = attendLoading && studyLoading

  return (
    <Modal
      header
      title={t('t015')}
      onClickDelete={() => {
        _viewCalendarModal(false)
      }}
      onClickLightbox={() => {
        _viewCalendarModal(false)
      }}>
      <CalendarUI loading={loading} />
    </Modal>
  )
}

const CalendarUI = ({ loading: propsLoading }: { loading: boolean }) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { fetch: attendFetch, loading: attendLoading } =
    useFetchAttendCalendar()
  const { fetch: studyFetch, loading: studyLoading } = useFetchStudyCalendar()

  const loading = propsLoading || attendLoading || studyLoading

  const nowDate = new Date()
  const [info, setInfo] = useState<{ year: number; month: number }>({
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
  })

  const monthNames = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]
  const monthShorts = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const monthChangeLeft = ({
    year,
    month,
  }: {
    year: number
    month: number
  }) => {
    const newYear = month - 1 <= 0 ? year - 1 : year
    const newMonth = month - 1 <= 0 ? 12 : month - 1
    const yearMonth = { year: newYear, month: newMonth }

    studyFetch(yearMonth)
    attendFetch(yearMonth)
    setInfo(yearMonth)
  }
  const monthChangeRight = ({
    year,
    month,
  }: {
    year: number
    month: number
  }) => {
    const newYear = month + 1 >= 13 ? year + 1 : year
    const newMonth = month + 1 >= 13 ? 1 : month + 1
    const yearMonth = { year: newYear, month: newMonth }

    studyFetch(yearMonth)
    attendFetch(yearMonth)
    setInfo(yearMonth)
  }

  const [isSimpleMode, _isSimpleMode] = useState(true)

  const dayArrays = useMemo(() => {
    const days: number[] = []

    const monthOffset = info.month - 1
    const date = new Date(info.year, monthOffset, 1)
    const dayOfNum = date.getDay()
    date.setMonth(monthOffset + 1)
    date.setDate(0)
    const lastDay = date.getDate()

    for (let i = 0; i < 7; i++) {
      if (dayOfNum > i) {
        days.push(-1)
      } else {
        break
      }
    }
    for (let i = 1; i <= lastDay; i++) {
      days.push(i)
    }
    return days
  }, [info])

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <Nav>
          <NavItem
            active={isSimpleMode}
            onClick={() => {
              _isSimpleMode(true)
            }}
            width="100%">
            {t('t016')}
          </NavItem>
          <NavItem
            active={!isSimpleMode}
            onClick={() => {
              _isSimpleMode(false)
            }}
            width="100%">
            {t('t017')}
          </NavItem>
        </Nav>
      </div>
      <div className={style.calendar_modal}>
        <div className={`${style.cal_header} ${monthNames[info.month - 1]}`}>
          <div className={style.cal_header_container}>
            <div className={style.current_month}>
              <div className={`${style.year_carousel} year_carousel`}>
                <div className={'carousel_left_button'}></div>
                <div className={`${style.cal_year} cal_year`}>{info.year}</div>
                <div className={'carousel_right_button'}></div>
              </div>
              <div className={style.month_carousel}>
                <div
                  className={'carousel_left_button'}
                  onClick={() => monthChangeLeft(info)}></div>
                <div className={`${style.cal_month} cal_month`}></div>
                <div
                  className={'carousel_right_button'}
                  onClick={() => monthChangeRight(info)}></div>
              </div>
            </div>
            <div className={style.monthly_study_status}>
              {isSimpleMode ? (
                <CalendarSimpleModeInfo loading={loading} />
              ) : (
                <CalendarDetailModeInfo loading={loading} />
              )}
            </div>
          </div>
        </div>
        <div className={style.cal_body}>
          {isSimpleMode ? (
            <CalendarSimpleModeBody
              yearMonth={info}
              days={dayArrays}
              loading={loading}
            />
          ) : (
            <CalendarDetailModeBody
              yearMonth={info}
              days={dayArrays}
              loading={loading}
            />
          )}
        </div>
        <CalendarEvent month={monthShorts[info.month - 1]} />
      </div>
    </>
  )
}

// 캘린더 테이블 헤더 (요일)
const CalTableHeader = () => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.cal_table_header}>
      <div className={style.col_day}>SUN</div>
      <div className={style.col_day}>MON</div>
      <div className={style.col_day}>TUE</div>
      <div className={style.col_day}>WED</div>
      <div className={style.col_day}>THU</div>
      <div className={style.col_day}>FRI</div>
      <div className={style.col_day}>SAT</div>
    </div>
  )
}

// 캘린더 모달 > 간편보기 헤더정보
const CalendarSimpleModeInfo = ({ loading }: { loading: boolean }) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const attendCalendar = useCalendarAttend().payload
  const studyCalendar = useCalendarStudy().payload.calendar

  const attendDays =
    (attendCalendar && attendCalendar.filter((a) => a.validYn).length) || 0
  const studyDays =
    (studyCalendar && studyCalendar.filter((a) => a.successYn).length) || 0

  if (loading) {
    return <></>
  }
  return (
    <div className={style.calendar_simple_mode_info}>
      <div className={style.attend_days}>
        <Image
          alt={''}
          src="/src/images/@calendar-modal/circle_green.svg"
          width="18"
          height="18"
        />
        <span>{t('t018', { num: attendDays })}</span>
      </div>
      <div className={style.achieve_goals}>
        <Image
          alt={''}
          src="/src/images/@calendar-modal/circle_blue.svg"
          width="18"
          height="18"
        />
        <span>{t('t019', { num: studyDays })}</span>
      </div>
    </div>
  )
}

// 캘린더 모달 > 간편보기 달력
const CalendarSimpleModeBody = ({
  yearMonth,
  days,
  loading,
}: {
  yearMonth: { year: number; month: number }
  days: number[]
  loading: boolean
}) => {
  const style = useStyle(STYLE_ID)

  const attendCalendar = useCalendarAttend().payload
  const studyCalendar = useCalendarStudy().payload.calendar

  return (
    <>
      <CalTableHeader />
      <div className={style.calendar_simple_mode_body}>
        {days.map((day, i) => {
          const isAttend =
            !loading &&
            day > 0 &&
            attendCalendar.length > 0 &&
            attendCalendar.length >= day
              ? attendCalendar[day - 1].validYn
              : false
          const isSuccess =
            !loading &&
            day > 0 &&
            studyCalendar.length > 0 &&
            studyCalendar.length >= day
              ? studyCalendar[day - 1].successYn
              : false
          return (
            <CalendarSimpleDay
              key={`Cal_${yearMonth.year}_${yearMonth.month}_${day}_${i}`}
              day={day}
              isBlank={day < 0}
              isAttend={isAttend}
              isSuccess={isSuccess}
            />
          )
        })}
      </div>
    </>
  )
}

const CalendarSimpleDay = ({
  day,
  isBlank,
  isAttend,
  isSuccess,
}: {
  day: number
  isBlank?: boolean
  isAttend?: boolean
  isSuccess?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  let iconClassName = ''
  if (!isBlank) {
    if (isSuccess) {
      iconClassName = `${style.event} ${style.achieved_goals}`
    } else if (isAttend) {
      iconClassName = `${style.event} ${style.attendance}`
    } else {
      iconClassName = `${style.event} ${style.no_attendance}`
    }
  }
  return (
    <div className={style.cal_item}>
      <div className={style.date}>{!isBlank ? day : ''}</div>
      {/* no_attendance: 미출석, attendance: 출석함, achieved_goals: 일일목표달성) */}
      <div className={iconClassName}></div>
    </div>
  )
}

// 캘린더 모달 > 상세보기 헤더정보
const CalendarDetailModeInfo = ({ loading }: { loading: boolean }) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const studyCalendar = useCalendarStudy().payload.calendar
  const studyDays =
    (studyCalendar && studyCalendar.filter((a) => a.successYn).length) || 0
  const userSetting = useStudentDailyLearning().payload
  const settingType = userSetting.settingType
  const settingValue =
    settingType === 'Points' ? userSetting.point : userSetting.books

  if (loading) {
    return <></>
  }
  return (
    <div className={style.calendar_detail_mode_info}>
      {/* 일일목표설정이 포인트획득 방식인 경우 */}
      {settingType === 'Points' && (
        <div className={style.calendar_detail_mode_info_container}>
          <div className={style.goal_point_pass}>
            <Image
              alt=""
              src="/src/images/@calendar-modal/point_blue.svg"
              width="18"
              height="18"
            />
            <span>{t('t019', { num: studyDays })}</span>
          </div>
          <div className={style.daily_goal_info}>
            {/* <Image
              src="/src/images/@calendar-modal/flag_check_dark_blue.svg"
              width="18"
              height="18"
            /> */}
            <span>{t('t020', { num: settingValue })}</span>
          </div>
        </div>
      )}
      {/* 일일목표설정이 학습완료(읽은권수) 방식인 경우 */}
      {settingType === 'Books' && (
        <div className={style.calendar_detail_mode_info_container}>
          <div className={style.goal_passed_pass}>
            <Image
              alt=""
              src="/src/images/@calendar-modal/book_blue.svg"
              width="18"
              height="18"
            />
            <span>{t('t019', { num: studyDays })}</span>
          </div>
          <div className={style.daily_goal_info}>
            {/* <Image
              src="/src/images/@calendar-modal/flag_check_dark_blue.svg"
              width="18"
              height="18"
            /> */}
            <span>{t('t021', { num: settingValue })}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// 캘린더 모달 > 상세보기 달력
const CalendarDetailModeBody = ({
  yearMonth,
  days,
  loading,
}: {
  yearMonth: { year: number; month: number }
  days: number[]
  loading: boolean
}) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const attendCalendar = useCalendarAttend().payload
  const studyCalendar = useCalendarStudy().payload.calendar
  const studyBeforeSetup = useCalendarStudy().payload.beforeSetup

  const [tabButtonStatus, _tabButtonStatus] = useState<'point' | 'passed'>(
    'passed',
  )

  let monthlyEarnPoint = 0.0
  let monthlyBooks = 0
  studyCalendar.forEach((s) => {
    monthlyBooks += s.books
    monthlyEarnPoint += s.point
  })

  return (
    <>
      {/* 탭 버튼 */}
      <div className={style.cal_detail_mode_tabs}>
        <div
          className={`${style.tab_button} ${
            tabButtonStatus === 'passed' && style.active
          }`}
          onClick={() => {
            _tabButtonStatus('passed')
          }}>
          {tabButtonStatus === 'passed' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/book_blue.svg"
              width={24}
              height={24}
            />
          )}
          {tabButtonStatus === 'point' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/book_white.svg"
              width={24}
              height={24}
            />
          )}
          <span>{t('t022')}</span>
          {tabButtonStatus === 'passed' && (
            <span>{t('t023', { num: monthlyBooks })}</span>
          )}
        </div>
        <div
          className={`${style.tab_button} ${
            tabButtonStatus === 'point' && style.active
          }`}
          onClick={() => {
            _tabButtonStatus('point')
          }}>
          {tabButtonStatus === 'point' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/point_blue.svg"
              width={24}
              height={24}
            />
          )}
          {tabButtonStatus === 'passed' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/point_white.svg"
              width={24}
              height={24}
            />
          )}
          <span>{t('t476')}</span>
          {tabButtonStatus === 'point' && (
            <span>
              {Number.isInteger(monthlyEarnPoint)
                ? monthlyEarnPoint
                : monthlyEarnPoint.toFixed(1)}
              P
            </span>
          )}
        </div>
      </div>
      {/* 캘린더 */}
      <div className={style.cal_detail_mode_body}>
        {days.map((day, i) => {
          const attendItem =
            day > 0 && attendCalendar.length > 0
              ? attendCalendar[day - 1]
              : undefined
          const isAttend = attendItem?.validYn || false
          const eventReadCount = attendItem && attendItem.studyCountHundred > 0
          const eventLevelMaster =
            (attendItem && attendItem.levelUpLevel !== '') || false

          const studyItem =
            day > 0 && studyCalendar.length > 0
              ? studyCalendar[day - 1]
              : undefined
          const isSuccess = studyItem?.successYn || false
          const point = studyItem?.point || 0.0
          const book = studyItem?.books || 0

          const beforeItem =
            day > 1 ? studyCalendar[day - 1 - 1] : studyBeforeSetup
          let eventStudyChange = false
          if (studyItem && beforeItem) {
            eventStudyChange =
              studyItem.aimPoint !== beforeItem.aimPoint ||
              studyItem.settingBooks !== beforeItem.settingBooks
          }

          return (
            <CalendarDetailDay
              key={`Cal-Detail_${yearMonth.year}_${yearMonth.month}_${day}_${i}`}
              type={tabButtonStatus}
              day={day}
              point={point}
              book={book}
              isBlank={day < 0}
              isAttend={isAttend}
              isSuccess={isSuccess}
              eventStudyChange={eventStudyChange}
              eventReadCount={eventReadCount}
              eventLevelMaster={eventLevelMaster}
            />
          )
        })}
      </div>
    </>
  )
}

const CalendarDetailDay = ({
  type,
  day,
  point,
  book,
  isBlank,
  isAttend,
  isSuccess,
  eventReadCount,
  eventStudyChange,
  eventLevelMaster,
}: {
  type: 'passed' | 'point'
  day: number
  point: number
  book: number
  isBlank?: boolean
  isAttend?: boolean
  isSuccess?: boolean
  eventReadCount?: boolean
  eventStudyChange?: boolean
  eventLevelMaster?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  if (isBlank) {
    return (
      <div className={style.cal_item}>
        <div className={style.date}></div>
        <div className={style.result}></div>
      </div>
    )
  }
  return (
    <div className={`${style.cal_item} ${isSuccess && style.goal}`}>
      <div className={style.date}>{day}</div>
      <div className={style.result}>
        <div
          className={`${style.passed} ${type === 'passed' && book > 0 ? style.active : ''} ${
            style.goal
          }`}
          style={{opacity: `${book || point == 0 && 0}`}}
          >
          {type === 'passed' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/book_blue.svg"
              width={16}
              height={16}
            />
          )}
          {type === 'point' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/book_gray.svg"
              width="16"
              height="16"
            />
          )}
          <span>{book}</span>
        </div>
        <div
          className={`${style.earn_point} ${type === 'point' && point > 0.0 ? style.active : ''} ${
            style.goal
          }`}
          style={{opacity: `${book || point == 0 && 0}`}}
          >
          {type === 'point' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/point_blue.svg"
              width={16}
              height={16}
            />
          )}
          {type === 'passed' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/point_gray.svg"
              width={16}
              height={16}
            />
          )}
          <span>{point}</span>
        </div>
        <div className={style.event_dots}>
          {eventReadCount && (
            <div className={`${style.dot} ${style.green}`}></div>
          )}
          {eventStudyChange && (
            <div className={`${style.dot} ${style.orange}`}></div>
          )}
          {eventLevelMaster && (
            <div className={`${style.dot} ${style.purple}`}></div>
          )}
        </div>
      </div>
    </div>
  )
}

const CalendarEvent = ({ month }: { month: string }) => {
  // @Language 'common'
  const { t } = useTranslation()

  const attendCalendar = useCalendarAttend().payload
  const studyCalendar = useCalendarStudy().payload.calendar
  const beforeSetup = useCalendarStudy().payload.beforeSetup

  const events: {
    day: number
    item: {
      type: 'books' | 'change' | 'levelup'
      value: string
      extra?: string
    }[]
  }[] = []
  attendCalendar.forEach((attend, idx) => {
    const studyBefore = idx <= 0 ? beforeSetup : studyCalendar[idx - 1]
    const study = studyCalendar[idx]

    const eventItem: {
      day: number
      item: {
        type: 'books' | 'change' | 'levelup'
        value: string
        extra?: string
      }[]
    } = {
      day: idx + 1,
      item: [],
    }
    if (attend.studyCountHundred) {
      eventItem.item.push({
        type: 'books',
        value: attend.studyCountHundred.toString(),
      })
    }
    if (study && studyBefore) {
      if (
        study.settingType === 'Books' &&
        studyBefore.settingBooks !== study.settingBooks
      ) {
        eventItem.item.push({
          type: 'change',
          value: study.settingBooks.toString(),
          extra: 'book',
        })
      } else if (
        study.settingType === 'Points' &&
        studyBefore.aimPoint !== study.aimPoint
      ) {
        eventItem.item.push({
          type: 'change',
          value: study.aimPoint.toString(),
          extra: 'point',
        })
      }
    }
    if (attend.levelUpLevel) {
      eventItem.item.push({
        type: 'levelup',
        value: attend.levelUpLevel.toString(),
      })
    }
    if (eventItem.item.length > 0) {
      events.push(eventItem)
    }
  })
  return (
    <CalendarEventHistory>
      {events.reverse().map((event) => {
        return event.item.map((item, idx) => {
          let text = ''
          switch (item.type) {
            case 'books':
              text = t('t024', { num: item.value })
              break
            case 'levelup':
              text = t('t025', { txt: item.value })
              break
            case 'change':
              if (item.extra === 'book') {
                text = t('t026', { num: item.value })
              } else if (item.extra === 'point') {
                text = t('t027', { num: item.value })
              }
              break
          }
          const isSkipLabel = idx > 0
          return (
            <CalendarEventHistoryItem
              key={`Event_${item.type}_${event.day}`}
              month={month}
              isSkipLabel={isSkipLabel}
              day={event.day}
              type={item.type}>
              {text}
            </CalendarEventHistoryItem>
          )
        })
      })}
    </CalendarEventHistory>
  )
}

// 켈린더 모달 > 날짜별 이벤트 (100권 돌파 등...)
const CalendarEventHistory = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.calendar_event_history}>{children}</div>
}

// 켈린더 모달 > 날짜별 이벤트 아이템
const CalendarEventHistoryItem = ({
  month,
  day,
  isSkipLabel,
  type,
  children,
}: {
  month: string
  day: number
  isSkipLabel?: boolean
  type: 'books' | 'change' | 'levelup'
  children?: ReactNode
}) => {
  const style = useStyle(STYLE_ID)

  const isBookCount = type === 'books'
  const changeGoal = type === 'change'
  const achieveLevelMaster = type === 'levelup'
  return (
    <>
      <div className={style.event_date}>
        <div className={style.month}>{isSkipLabel ? '' : month}</div>
        <div className={style.date}>{isSkipLabel ? '' : day}</div>
        <div
          className={`
          ${style.dot} ${isBookCount && style.green} ${
            changeGoal && style.orange
          } ${achieveLevelMaster && style.purple}
          `}></div>
      </div>
      <div className={style.description}>
        <div
          className={`${style.tag} ${isBookCount && style.green} ${
            changeGoal && style.orange
          } ${achieveLevelMaster && style.purple}`}>
          {children}
        </div>
      </div>
    </>
  )
}
