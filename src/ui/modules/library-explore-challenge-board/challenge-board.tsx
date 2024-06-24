'use client'

// @Deprecate('Not Used')
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'challenge_board'
// 영어독서왕 스코어보드
export function ChallengeBoard({
  challengeTitle,
  symbolImgSrc,
  challengePeriod,
  children,
}: {
  challengeTitle: string
  symbolImgSrc: string
  challengePeriod: string
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  return (
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
          trophyImgSrc="/src/images/@challenge-board/sincerity_lg.svg"
          goalName="성실상"
        />
        <MyProgress />
      </div>
    </div>
  )
}

// 영어독서왕 스코어보드 > 나의목표
export function MyGoal({
  trophyImgSrc,
  goalName,
  goalDays = 0,
  goalPoint = 0,
  onClick,
}: {
  trophyImgSrc: string
  goalName: string
  goalDays?: number
  goalPoint?: number
  onClick?: () => void
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
            <button
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
          </div>
          <ul className={style.goal_info}>
            <li>• 대회 기간 동안 학습일수 {goalDays}일 이상 참여</li>
            <li>• 포인트 {goalPoint}P 이상 획득</li>
          </ul>
          <section>
            <div className={`${style.air} ${style.air1}`}></div>
            <div className={`${style.air} ${style.air2}`}></div>
            <div className={`${style.air} ${style.air3}`}></div>
            <div className={`${style.air} ${style.air4}`}></div>
          </section>
        </div>
      </div>
      {isSetMygoalActive && (
        <SetMyGoal _isSetMygoalActive={_isSetMygoalActive} />
      )}
    </>
  )
}

// 영어독서왕 스코어보드 > 나의목표 > 목표설정 팝업
export function SetMyGoal({
  _isSetMygoalActive,
}: {
  _isSetMygoalActive?: (isView: boolean) => void
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
        <SetMyGoalItem
          imgSrc="/src/images/@challenge-board/best_lg.svg"
          title="대상"
          exp="6,500포인트 이상 + 학습일수 80일 이상"
          active
        />
        <SetMyGoalItem
          imgSrc="/src/images/@challenge-board/grand_lg.svg"
          title="최우수상"
          exp="6,500포인트 이상 + 학습일수 80일 이상"
        />
        <SetMyGoalItem
          imgSrc="/src/images/@challenge-board/excellence_lg.svg"
          title="우수상"
          exp="6,500포인트 이상 + 학습일수 80일 이상"
        />
        <SetMyGoalItem
          imgSrc="/src/images/@challenge-board/sincerity_lg.svg"
          title="성실상"
          exp="6,500포인트 이상 + 학습일수 80일 이상"
        />
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
}: {
  imgSrc: string
  title: string
  exp: string
  active?: boolean
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.set_my_goal_item} ${active && style.active}`}>
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
        <div className={style.txt_p}>{exp}</div>
      </div>
    </div>
  )
}

// 영어독서왕 스코어보드 > 챌린지 참여현황
export function MyProgress() {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_progress}>
      <div className={style.txt_h}>참여 현황</div>
      <div className={style.progress_group}>
        <ChallengeProgress
          isDday
          currentDday={80}
          recommendDailyPoints={30.1}
          progressWidth={50}
        />
        <ChallengeProgress
          isStudyDay
          currentStudyDays={2}
          finalStudyDays={60}
          progressWidth={50}
        />
        <ChallengeProgress
          isEarnPoint
          currentEarnPoint={10.2}
          finalGoalPoint={2000}
          progressWidth={50}
        />
      </div>
    </div>
  )
}

// 영어독서왕 스코어보드 > 챌린지 참여현황 > 프로그래스
// (isDday: D-Day 유형, currentDday: 만료 D-Day, recommendDailyPoints: 일일 권장 획득 포인트,
// isStudyDay: 학습일수 유형, currentStudyDays: 현재 학습일수, finalStudyDays: 목표 학습일수,
// isEarnPoint: 포인트 획득 유형, currentEarnPoint: 현재까지 획득포인트, finalGoalPoint: 목표 획득포인트)
const ChallengeProgress = ({
  isDday,
  currentDday,
  recommendDailyPoints,
  isStudyDay,
  currentStudyDays,
  finalStudyDays,
  isEarnPoint,
  currentEarnPoint,
  finalGoalPoint,
  progressWidth,
}: {
  isDday?: boolean
  currentDday?: number
  recommendDailyPoints?: number
  isStudyDay?: boolean
  currentStudyDays?: number
  finalStudyDays?: number
  isEarnPoint?: boolean
  currentEarnPoint?: number
  finalGoalPoint?: number
  progressWidth?: number
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.challenge_progress}>
      <div className={style.progress_info}>
        <div className={style.row_a}>
          {/* 프로그래스 레이블 */}
          {isDday && (
            <>
              <Image
                alt=""
                src="/src/images/@challenge-board/d_day.svg"
                width={20}
                height={20}
              />
              <div>종료일까지</div>
            </>
          )}
          {isStudyDay && (
            <>
              <Image
                alt=""
                src="/src/images/@challenge-board/bookmark_on_book.svg"
                width={20}
                height={20}
              />
              <div>학습일수</div>
            </>
          )}
          {isEarnPoint && (
            <>
              <Image
                alt=""
                src="/src/images/@challenge-board/p_coin.svg"
                width={20}
                height={20}
              />
              <div>획득한 포인트</div>
            </>
          )}
        </div>
        <div className={style.row_b}>
          {/* 프로그래스 인포 */}
          <>
            {isDday && (
              <>
                <div className={style.txt_d}>D-{currentDday}</div>
                <div className={style.comment}>
                  / 매일 평균 {recommendDailyPoints}P 획득 권장
                </div>
              </>
            )}
            {isStudyDay && (
              <>
                <div className={style.txt_d}>{currentStudyDays}</div>
                <div className={style.comment}>/ {finalStudyDays} days</div>
              </>
            )}
            {isEarnPoint && (
              <>
                <div className={style.txt_d}>{currentEarnPoint}</div>
                <div className={style.comment}>/ {finalGoalPoint}P</div>
              </>
            )}
          </>
        </div>
      </div>
      <div
        className={`${style.progress_bar} ${isDday && style.green} ${
          isStudyDay && style.blue
        } ${isEarnPoint && style.orange}`}
        style={{ width: `${progressWidth}%` }}></div>
    </div>
  )
}
