'use client'

import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { EventPrize } from '@/repository/client/object/event-prize'
import { AlertBar, Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'challenge_board'

// 영어독서왕 스코어보드
export function ChallengeBoard({
  symbolImgSrc,
  challengeTitle,
  startDate,
  endDate,
  eventDay,
  prize,
  prizeList,
  targetDay,
  targetPoint,
  userDay,
  userPoint,
  isTodayStudy,
  onPrizeChange,
}: {
  symbolImgSrc: string
  challengeTitle: string
  startDate: string
  endDate: string
  eventDay: number
  prize: string
  prizeList: EventPrize[]
  targetDay: number
  targetPoint: number
  userDay: number
  userPoint: number
  isTodayStudy: boolean
  onPrizeChange?: (prizeId: string) => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  let goalName = ''
  let medalImages = ''
  prizeList.forEach((item, idx) => {
    if (item.eventPrizeId === prize) {
      goalName = item.prizeTitle
      if (idx === 0) {
        medalImages = '/src/images/@challenge-board/best_lg.svg'
      } else if (idx === 1) {
        medalImages = '/src/images/@challenge-board/grand_lg.svg'
      } else if (idx === 2) {
        medalImages = '/src/images/@challenge-board/excellence_lg.svg'
      } else if (idx === 3) {
        medalImages = '/src/images/@challenge-board/sincerity_lg.svg'
      }
    }
  })

  const todayObj = new Date()
  const startDateObj = DateUtils.createDate(startDate)
  const endDateObj = DateUtils.createDate(endDate)

  const startDateTxt = DateUtils.toStringDate(startDateObj, {
    divide: '. ',
  })
  const endDatetxt = DateUtils.toStringDate(endDateObj, {
    divide: '. ',
  })
  const challengePeriod = `${startDateTxt} ~ ${endDatetxt}`

  const progressDay = Math.min(
    eventDay - DateUtils.dayDistance(todayObj, endDateObj, true),
    eventDay + 1,
  )
  let minTargetDay = eventDay
  let minTargetPoint = 100000
  prizeList.forEach((p) => {
    if (p.prizeDays < minTargetDay) {
      minTargetDay = p.prizeDays
    }
    if (p.prizePoint < minTargetPoint) {
      minTargetPoint = p.prizePoint
    }
  })

  const remainingDay = eventDay - progressDay
  const isDayDropout =
    remainingDay + userDay + (isTodayStudy ? 0 : 1) < minTargetDay

  const BASE_POINT = 200
  const POINT_CAN_DAYS = Math.ceil(minTargetPoint / BASE_POINT)
  const isPointDropout =
    remainingDay <= POINT_CAN_DAYS &&
    (remainingDay + 1) * BASE_POINT + userPoint < minTargetPoint
  const isDropout = isDayDropout || isPointDropout

  const todayChallengeDoingValue = DateUtils.rangeDayCheck(
    startDateObj,
    endDateObj,
    todayObj,
  )
  const isTodayChallengeDoing =
    todayChallengeDoingValue !== -2 && todayChallengeDoingValue !== 2

  /*
  1. 챌린지 보드는 영어 독서왕 대회 기간일 때 보이기
  2. 챌린지 목표가 미달인 경우(학습일 수 부족) -> 얼럿바에 메세지 교체 
  3. 참여 하기 옆에 오늘 참여, 미참여 메세지 나오게 하기 (만약 나의 목표 미달이면 아무 메세지도 보이지 않게 하기)
  */

  let challengeMessage = '영어독서왕 챌린지 기간이 아닙니다.'
  if (isTodayChallengeDoing) {
    if (isDropout) {
      challengeMessage =
        '영어독서왕 목표 달성을 위한 포인트와 학습일 수가 부족해요. 다음에 다시 도전해 주세요.'
    } else {
      challengeMessage =
        '영어독서왕에 도전해 보세요! 나의 목표를 설정하고 대회 기간 안에 목표를 달성하세요! (하루 최대 얻을 수 있는 포인트는 150P입니다.)'
    }
  }
  const studyFlag = isDropout ? 'fail' : isTodayStudy ? 'complete' : 'start'

  return (
    <>
      <AlertBar>
        <span style={isDropout ? { color: '#ff2a2a' } : {}}>
          {challengeMessage}
        </span>
      </AlertBar>
      <div className={style.challenge_board}>
        <div className={style.header}>
          <div className={style.txt_h}>{challengeTitle}</div>
          <div className={style.line}></div>
          <div className={style.challenge_symbol}>
            <Image alt="" src={symbolImgSrc} width={200} height={170} />
          </div>
          <div className={style.challenge_period}>{challengePeriod}</div>
        </div>
        <div className={style.body}>
          <MyGoal
            trophyImgSrc={medalImages}
            goalName={goalName}
            prize={prize}
            prizeList={prizeList}
            onPrizeChange={onPrizeChange}
            isTodayChallengeDoing={isTodayChallengeDoing}
          />
          <MyProgress
            progressDay={eventDay < progressDay ? eventDay : progressDay}
            date={eventDay}
            targetDay={targetDay}
            userDay={userDay}
            targetPoint={targetPoint}
            userPoint={userPoint}
            studyFlag={studyFlag}
            isTodayChallengeDoing={isTodayChallengeDoing}
          />
        </div>
      </div>
    </>
  )
}

// 영어독서왕 스코어보드 > 나의목표
export function MyGoal({
  trophyImgSrc,
  goalName,
  goalDays = 0,
  goalPoint = 0,
  isTodayChallengeDoing,
  prize,
  prizeList,
  onPrizeChange,
}: {
  trophyImgSrc: string
  goalName: string
  goalDays?: number
  goalPoint?: number
  isTodayChallengeDoing: boolean
  prize: string
  prizeList: EventPrize[]
  onPrizeChange?: (prizeId: string) => void
}) {
  const style = useStyle(STYLE_ID)

  const [isSetMygoalActive, _isSetMygoalActive] = useState(false)

  return (
    <>
      <div className={style.my_goal}>
        <div className={style.txt_h}>나의 목표</div>
        <div className={style.goal}>
          <Image alt="" src={trophyImgSrc} width={100} height={120} />
          <div className={style.goal_container}>
            <div className={style.goal_name}>{goalName}</div>
          </div>
          {isTodayChallengeDoing && (
            <button
              className={style.goal_set_button}
              onClick={() => {
                _isSetMygoalActive(true)
              }}>
              <Image
                alt=""
                src="/src/images/pencil-icons/pencil_gray.svg"
                width={20}
                height={20}
              />
            </button>
          )}
          {goalDays > 0 && goalPoint > 0 && (
            <ul className={style.goal_info}>
              <li>• 대회 기간 동안 학습일수 {goalDays}일 이상 참여</li>
              <li>• 포인트 {goalPoint}P 이상 획득</li>
            </ul>
          )}
          <section>
            <div className={`${style.air} ${style.air1}`}></div>
            <div className={`${style.air} ${style.air2}`}></div>
            <div className={`${style.air} ${style.air3}`}></div>
            <div className={`${style.air} ${style.air4}`}></div>
          </section>
        </div>
      </div>
      {isSetMygoalActive && (
        <SetMyGoal
          currentPrize={prize}
          prizeList={prizeList}
          _isSetMygoalActive={_isSetMygoalActive}
          onPrizeChange={onPrizeChange}
        />
      )}
    </>
  )
}

// 영어독서왕 스코어보드 > 나의목표 > 목표설정 팝업
export function SetMyGoal({
  currentPrize,
  prizeList,
  _isSetMygoalActive,
  onPrizeChange,
}: {
  currentPrize: string
  prizeList: EventPrize[]
  _isSetMygoalActive?: (isView: boolean) => void
  onPrizeChange?: (prizeId: string) => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <Modal
      compact
      header
      title="영어독서왕 목표 설정"
      onClickDelete={() => {
        _isSetMygoalActive && _isSetMygoalActive(false)
      }}>
      <div className={style.set_my_goal}>
        {prizeList.map((prize, idx) => {
          let medalImages = ''
          if (idx === 0) {
            medalImages = '/src/images/@challenge-board/best_lg.svg'
          } else if (idx === 1) {
            medalImages = '/src/images/@challenge-board/grand_lg.svg'
          } else if (idx === 2) {
            medalImages = '/src/images/@challenge-board/excellence_lg.svg'
          } else if (idx === 3) {
            medalImages = '/src/images/@challenge-board/sincerity_lg.svg'
          }
          return (
            <SetMyGoalItem
              key={prize.eventPrizeId}
              imgSrc={medalImages}
              title={prize.prizeTitle}
              exp={`${prize.prizePoint}포인트 이상 + 학습일수 ${prize.prizeDays}일 이상`}
              active={currentPrize === prize.eventPrizeId}
              onClick={() => {
                onPrizeChange && onPrizeChange(prize.eventPrizeId)
              }}
            />
          )
        })}
        <Link
          href="/"
          target="_blank"
          className="color-blue bold-1 text-align-center">
          영어독서왕 시상 안내
        </Link>
      </div>
    </Modal>
  )
}

// 영어독서왕 스코어보드 > 나의목표 > 목표설정 아이템
export function SetMyGoalItem({
  imgSrc,
  title,
  exp,
  active,
  onClick,
}: {
  imgSrc: string
  title: string
  exp: string
  active?: boolean
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.set_my_goal_item} ${active && style.active}`}
      onClick={onClick}>
      <div className={style.col_a}>
        {active ? (
          <Image
            alt=""
            src="/src/images/radio-icons/radio_on.svg"
            width={20}
            height={20}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/radio-icons/radio_off.svg"
            width={20}
            height={20}
          />
        )}
      </div>
      <div className={style.col_b}>
        <Image alt="" src={imgSrc} width={80} height={80} />
      </div>
      <div className={style.col_c}>
        <div className={style.txt_h}>{title}</div>
        {/* <div className={style.txt_p}>{exp}</div> */}
      </div>
    </div>
  )
}

// 영어독서왕 스코어보드 > 챌린지 참여현황
export function MyProgress({
  date,
  progressDay,
  targetDay,
  userDay,
  targetPoint,
  userPoint,
  studyFlag,
  isTodayChallengeDoing,
}: {
  progressDay: number
  date: number
  targetDay: number
  userDay: number
  targetPoint: number
  userPoint: number
  studyFlag: 'start' | 'complete' | 'fail'
  isTodayChallengeDoing: boolean
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.my_progress}>
      <div className={style.txt_h}>
        참여 현황
        {studyFlag === 'start' && (
          <span
            style={{ color: '#00a0fd', fontSize: '0.7em', marginLeft: '10px' }}>
            학습을 시작하세요!
          </span>
        )}
        {studyFlag === 'complete' && (
          <span
            style={{ color: '#00a0fd', fontSize: '0.7em', marginLeft: '10px' }}>
            오늘 학습했어요!
          </span>
        )}
      </div>
      <div className={style.progress_group}>
        <ChallengeStudyProgress
          currentStudyDays={userDay}
          finalStudyDays={targetDay}
        />
        <ChallengePointProgress
          currentEarnPoint={userPoint}
          finalGoalPoint={targetPoint}
        />
        {isTodayChallengeDoing && (
          <ChallengeDayProgress
            eventDay={date}
            progressDay={progressDay}
            currentEarnPoint={userPoint}
            finalGoalPoint={targetPoint}
            isDropout={studyFlag === 'fail'}
          />
        )}
      </div>
    </div>
  )
}

// 영어독서왕 스코어보드 > 챌린지 참여현황 > 프로그래스
// isStudyDay: 학습일수 유형, currentStudyDays: 현재 학습일수, finalStudyDays: 목표 학습일수,
const ChallengeStudyProgress = ({
  currentStudyDays = 0,
  finalStudyDays = 0,
}: {
  currentStudyDays?: number
  finalStudyDays?: number
}) => {
  const style = useStyle(STYLE_ID)
  const progressWidth = Math.min((currentStudyDays / finalStudyDays) * 100, 100)

  return (
    <div className={style.challenge_progress}>
      <div className={style.progress_info}>
        <div className={style.row_a}>
          {/* 프로그래스 레이블 */}
          <Image
            alt=""
            src="/src/images/@challenge-board/bookmark_on_book.svg"
            width={20}
            height={20}
          />
          <div>학습일수</div>
        </div>
        <div className={style.row_b}>
          {/* 프로그래스 인포 */}
          <div className={style.txt_d}>{currentStudyDays}</div>
          <div className={style.comment}>/ {finalStudyDays} days</div>
        </div>
      </div>
      <div
        className={`${style.progress_bar} ${style.blue}`}
        style={{ width: `${progressWidth}%` }}></div>
    </div>
  )
}

// 영어독서왕 스코어보드 > 챌린지 참여현황 > 프로그래스
// isEarnPoint: 포인트 획득 유형, currentEarnPoint: 현재까지 획득포인트, finalGoalPoint: 목표 획득포인트)
const ChallengePointProgress = ({
  currentEarnPoint = 0,
  finalGoalPoint = 0,
}: {
  currentEarnPoint?: number
  finalGoalPoint?: number
}) => {
  const style = useStyle(STYLE_ID)

  const progressWidth = Math.min((currentEarnPoint / finalGoalPoint) * 100, 100)

  return (
    <div className={style.challenge_progress}>
      <div className={style.progress_info}>
        <div className={style.row_a}>
          {/* 프로그래스 레이블 */}
          <Image
            alt=""
            src="/src/images/@challenge-board/p_coin.svg"
            width={20}
            height={20}
          />
          <div>획득한 포인트</div>
        </div>
        <div className={style.row_b}>
          {/* 프로그래스 인포 */}
          <div className={style.txt_d}>{currentEarnPoint.toFixed(2)}</div>
          <div className={style.comment}>/ {finalGoalPoint}P</div>
        </div>
      </div>
      <div
        className={`${style.progress_bar} ${style.orange}`}
        style={{ width: `${progressWidth}%` }}></div>
    </div>
  )
}

// 영어독서왕 스코어보드 > 챌린지 참여현황 > 프로그래스
// isDday: D-Day 유형, currentDday: 만료 D-Day, recommendDailyPoints: 일일 권장 획득 포인트
const ChallengeDayProgress = ({
  eventDay = 0,
  progressDay = 0,
  currentEarnPoint = 0,
  finalGoalPoint = 0,
  isDropout = true,
}: {
  eventDay?: number
  progressDay?: number
  currentEarnPoint?: number
  finalGoalPoint?: number
  isDropout?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  const recommendDailyPoints =
    (finalGoalPoint - currentEarnPoint) / Math.max(eventDay - progressDay, 1)
  const progressWidth = Math.min((progressDay / eventDay) * 100, 100)

  return (
    <div className={style.challenge_progress}>
      <div className={style.progress_info}>
        <div className={style.row_a}>
          {/* 프로그래스 레이블 */}
          <Image
            alt=""
            src="/src/images/@challenge-board/d_day.svg"
            width={20}
            height={20}
          />
          <div>종료일까지</div>
        </div>
        <div className={style.row_b}>
          {/* 프로그래스 인포 */}
          <div className={style.txt_d}>D-{eventDay - progressDay - 1}</div>
          {!isDropout &&
            recommendDailyPoints > 0 &&
            recommendDailyPoints <= 150 && (
              <div className={style.comment}>
                / 매일 평균 {recommendDailyPoints.toFixed(2)}P 획득 권장
              </div>
            )}
        </div>
      </div>
      <div
        className={`${style.progress_bar} ${style.green}`}
        style={{ width: `${progressWidth}%` }}></div>
    </div>
  )
}
