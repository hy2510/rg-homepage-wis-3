'use client'

// @Deprecate('Not Used')
import './global-option-calendar.scss'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import { Modal, Nav, NavItem } from '../common-components'

const STYLE_ID = 'global_option_calendar'
// 캘린더 모달
export function CalendarModal({
  _viewCalendarModal,
}: {
  _viewCalendarModal: (isShow: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  const date = new Date()
  const today = ('0' + date.getDate()).slice(-2)
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

  const [changeCalVal, _changeCalVal] = useState(0)
  const monthChangeLeft = () => {
    date.getMonth() + changeCalVal > 0 ? _changeCalVal(changeCalVal - 1) : null
  }
  const monthChangeRight = () => {
    date.getMonth() + changeCalVal < 11 ? _changeCalVal(changeCalVal + 1) : null
  }

  const mon = monthNames[date.getMonth() + changeCalVal]

  // ____달력임시
  let e = []
  for (let i = 1; i < 31; i++) {
    e.push(i)
  }

  const [isSimpleMode, _isSimpleMode] = useState(true)

  return (
    <Modal
      header
      title="캘린더"
      onClickDelete={() => {
        _viewCalendarModal(false)
      }}
      onClickLightbox={() => {
        _viewCalendarModal(false)
      }}>
      <Nav>
        <NavItem
          active={isSimpleMode}
          onClick={() => {
            _isSimpleMode(true)
          }}
          width="100%">
          간편보기
        </NavItem>
        <NavItem
          active={!isSimpleMode}
          onClick={() => {
            _isSimpleMode(false)
          }}
          width="100%">
          상세보기
        </NavItem>
      </Nav>
      <div className={style.calendar_modal}>
        <div className={`${style.cal_header} ${mon}`}>
          <div className={style.cal_header_container}>
            <div className={style.current_month}>
              <div className={`${style.year_carousel} year_carousel`}>
                <div className={'carousel_left_button'}></div>
                <div className={`${style.cal_year} cal_year`}>
                  {date.getFullYear()}
                </div>
                <div className={'carousel_right_button'}></div>
              </div>
              <div className={style.month_carousel}>
                <div
                  className={'carousel_left_button'}
                  onClick={monthChangeLeft}></div>
                <div className={`${style.cal_month} cal_month`}></div>
                <div
                  className={'carousel_right_button'}
                  onClick={monthChangeRight}></div>
              </div>
              <div className={style.monthly_study_status}>
                {isSimpleMode ? (
                  <CalendarSimpleModeInfo />
                ) : (
                  <CalendarDetailModeInfo dailyGoalMode={'passed'} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={style.cal_body}>
          {isSimpleMode ? (
            <CalendarSimpleModeBody e={e} />
          ) : (
            <CalendarDetailModeBody e={e} />
          )}
        </div>
        <CalendarEventHistory>
          <CalendarEventHistoryItem month={'oct'} date={'10'} isBookCount>
            누적독서 - 100권 돌파
          </CalendarEventHistoryItem>
          <CalendarEventHistoryItem month={'oct'} date={'9'} changeGoal>
            목표변경 - 하루 4권 읽기
          </CalendarEventHistoryItem>
          <CalendarEventHistoryItem month={'oct'} date={'3'} achieveLevelMaster>
            Level Master 획득 - KA
          </CalendarEventHistoryItem>
        </CalendarEventHistory>
      </div>
    </Modal>
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
const CalendarSimpleModeInfo = () => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.calendar_simple_mode_info}>
      <div className={style.attend_days}>
        <Image
          alt={''}
          src="/src/images/@calendar-modal/circle_green.svg"
          width="18"
          height="18"
        />
        <span>출석일수: 11일</span>
      </div>
      <div className={style.achieve_goals}>
        <Image
          alt={''}
          src="/src/images/@calendar-modal/circle_blue.svg"
          width="18"
          height="18"
        />
        <span>일일목표 달성: 9건</span>
      </div>
    </div>
  )
}

// 캘린더 모달 > 간편보기 달력
const CalendarSimpleModeBody = (props: { e: number[] }) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <CalTableHeader />
      <div className={style.calendar_simple_mode_body}>
        {props.e.map((a, i) => {
          return (
            <div className={style.cal_item} key={i}>
              <div className={style.date}>{a}</div>
              {/* no_attendance: 미출석, attendance: 출석함, achieved_goals: 일일목표달성) */}
              <div className={`${style.event} ${style.no_attendance}`}></div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// 일일목표 달성방식 (passed: 학습권수 , point: 포인트획득)
const dailyGoalMode = 'point'

// 캘린더 모달 > 상세보기 헤더정보
const CalendarDetailModeInfo = ({
  dailyGoalMode,
}: {
  dailyGoalMode?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.calendar_detail_mode_info}>
      {/* 일일목표설정이 포인트획득 방식인 경우 */}
      {dailyGoalMode === 'point' && (
        <div className={style.calendar_detail_mode_info_container}>
          <div className={style.goal_point_pass}>
            <Image
              alt=""
              src="/src/images/@calendar-modal/point_blue.svg"
              width="18"
              height="18"
            />
            <span>일일목표 달성: 9건</span>
          </div>
          <div className={style.daily_goal_info}>
            {/* <Image
              src="/src/images/@calendar-modal/flag_check_dark_blue.svg"
              width="18"
              height="18"
            /> */}
            <span>(하루 +10P 획득하기)</span>
          </div>
        </div>
      )}
      {/* 일일목표설정이 학습완료(읽은권수) 방식인 경우 */}
      {dailyGoalMode === 'passed' && (
        <div className={style.calendar_detail_mode_info_container}>
          <div className={style.goal_passed_pass}>
            <Image
              alt=""
              src="/src/images/@calendar-modal/book_blue.svg"
              width="18"
              height="18"
            />
            <span>일일목표 달성: 9건</span>
          </div>
          <div className={style.daily_goal_info}>
            {/* <Image
              src="/src/images/@calendar-modal/flag_check_dark_blue.svg"
              width="18"
              height="18"
            /> */}
            <span>(하루 10권씩 학습하기)</span>
          </div>
        </div>
      )}
    </div>
  )
}

// 캘린더 모달 > 상세보기 달력
const CalendarDetailModeBody = ({ e }: { e: number[] }) => {
  const style = useStyle(STYLE_ID)

  const [tabButtonStatus, _tabButtonStatus] = useState(dailyGoalMode)

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
          <span>학습 권 수</span>
          {tabButtonStatus === 'passed' && <span>230권</span>}
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
          <span>포인트</span>
          {tabButtonStatus === 'point' && <span>230.11P</span>}
        </div>
      </div>
      {/* 캘린더 */}
      <div className={style.cal_detail_mode_body}>
        {e.map((a, i) => {
          return (
            <div key={`calendar_${i}`} className={style.cal_item}>
              <div className={style.date}>{a}</div>
              <div className={style.result}>
                <div className={style.event_dots}>
                  <div className={`${style.dot} ${style.green}`}></div>
                  <div className={`${style.dot} ${style.orange}`}></div>
                  <div className={`${style.dot} ${style.purple}`}></div>
                </div>
                <div
                  className={`${style.passed} ${
                    tabButtonStatus === 'passed' && style.active
                  } ${style.goal}`}>
                  {tabButtonStatus === 'passed' && (
                    <Image
                      alt={''}
                      src="/src/images/@calendar-modal/book_blue.svg"
                      width={16}
                      height={16}
                    />
                  )}
                  {tabButtonStatus === 'point' && (
                    <Image
                      alt={''}
                      src="/src/images/@calendar-modal/book_gray.svg"
                      width="16"
                      height="16"
                    />
                  )}
                  <span>12</span>
                </div>
                <div
                  className={`${style.earn_point} ${
                    tabButtonStatus === 'point' && style.active
                  } ${style.goal}`}>
                  {tabButtonStatus === 'point' && (
                    <Image
                      alt={''}
                      src="/src/images/@calendar-modal/point_blue.svg"
                      width={16}
                      height={16}
                    />
                  )}
                  {tabButtonStatus === 'passed' && (
                    <Image
                      alt={''}
                      src="/src/images/@calendar-modal/point_gray.svg"
                      width={16}
                      height={16}
                    />
                  )}
                  <span>150.99</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
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
  date,
  isBookCount,
  changeGoal,
  achieveLevelMaster,
  children,
}: {
  month: string
  date: string
  isBookCount?: boolean
  changeGoal?: boolean
  achieveLevelMaster?: boolean
  children?: ReactNode
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.event_date}>
        <div className={style.month}>{month}</div>
        <div className={style.date}>{date}</div>
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
