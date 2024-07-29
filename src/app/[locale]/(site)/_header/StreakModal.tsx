'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useOnLoadSuccessiveStudy } from '@/client/store/achieve/successive-study/hook'
import { useAchieveSuccessiveStudy } from '@/client/store/achieve/successive-study/selector'
import { useStudentContinuousStudy } from '@/client/store/student/continuous-study/selector'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { AlertBar, EmptyMessage, Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import StreakFireBig from '@/ui/modules/StreakFireBig'

/** 연속 학습일 아이템은 최대 300일 까지만 획득 가능 */
const CONTINUOUS_MAX_DAY = 300
/** 연속 학습일은 20일 단위로 누적됨 */
const CONTINUOUS_DAY_STEP = 20

const STYLE_ID = 'global_option_streak'

// 연속학습 모달
export function StreakModal({
  _viewStreakModal,
}: {
  _viewStreakModal?: (isView: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const { loading } = useOnLoadSuccessiveStudy()
  const name = useStudentInfo().payload.name
  const successiveStudyList = useAchieveSuccessiveStudy().payload
  const continuousDay = useStudentContinuousStudy()

  // 체크포인트
  const CheckPoint = ({
    imgSrc,
    score,
    date,
  }: {
    imgSrc: string
    score: number
    date: string
  }) => {
    return (
      <div className={style.check_point}>
        <div className={style.check_mark}>
          <div className={style.line}></div>
          <Image
            alt=""
            src="/src/images/@streak-modal/check_mark.svg"
            width={30}
            height={30}
          />
          <div className={style.line}></div>
        </div>
        <div className={style.label_image}>
          <Image alt="" src={imgSrc} width={110} height={110} />
        </div>
        <div className={style.check_message}>
          <div className={style.txt_l}>{t('t447', { num: score })}</div>
          <div className={style.date}>{date}</div>
        </div>
      </div>
    )
  }

  const nextItemDay =
    Math.floor(continuousDay / CONTINUOUS_DAY_STEP) * CONTINUOUS_DAY_STEP +
    CONTINUOUS_DAY_STEP
  const remainingText =
    continuousDay >= CONTINUOUS_MAX_DAY
      ? `${continuousDay}일 달성하였습니다!`
      : `${nextItemDay}일 달성까지 ${CONTINUOUS_DAY_STEP - (continuousDay % CONTINUOUS_DAY_STEP)}일 남았어요!`

  const t175 = t('t175')

  return (
    <Modal
      compact
      header
      title={t('t171')}
      onClickDelete={() => {
        _viewStreakModal && _viewStreakModal(false)
      }}
      onClickLightbox={() => {
        _viewStreakModal && _viewStreakModal(false)
      }}>
      <div className={style.streak_modal}>
        {!loading && (
          <>
            <div className={style.streak_modal_body}>
              <div className="mg-bottom-m">
                <AlertBar>{t('t172')}</AlertBar>
              </div>
              {/* 연속학습 달성 기록이 있을 때 */}
              {successiveStudyList && successiveStudyList.length > 0 ? (
                <>
                  <div className={style.advance_notice}>
                    <div className={style.txt_p}>{remainingText}</div>
                  </div>
                  {successiveStudyList
                    .filter(
                      (item) =>
                        item.straightDayCount >= CONTINUOUS_DAY_STEP &&
                        item.straightDayCount <=
                          Math.min(continuousDay, CONTINUOUS_MAX_DAY),
                    )
                    .reverse()
                    .map((item) => {
                      const day = item.straightDayCount
                      const date = item.achievedDate
                      const dateString = `${date.substring(0, 4)}. ${date.substring(4, 6)}. ${date.substring(6, 8)}`
                      const src = `/src/images/@streak-modal/badges/badge_${day}days.svg`
                      return (
                        <CheckPoint
                          key={`successive-study-${day}`}
                          score={day}
                          date={dateString}
                          imgSrc={src}
                        />
                      )
                    })}
                  {continuousDay >= 20 && (
                    <div className={style.start_point}>
                      <div className={style.txt_p}>{t('t498')}!</div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* 연속학습 달성 기록이 없을 때 */}
                  <EmptyMessage isAward>
                    {t('t085')}
                    <br />
                    {t('t173')}
                  </EmptyMessage>
                </>
              )}
            </div>
            <div className={style.streak_modal_bottom}>
              <div className={style.streak_status}>
                <div className={style.txt_l}>
                  {t('t174')}
                  <span className="color-blue">{t('t171')}</span>
                </div>
                <div className={`${style.score} ${continuousDay > 0 ? style.active : ''} ${continuousDay > 0 ? 'heartbeat' : ''}`}>
                  <span>{continuousDay}</span>
                </div>
                <div className={style.txt_l}>
                  <span className="color-blue" dangerouslySetInnerHTML={{ __html: t175}}></span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
