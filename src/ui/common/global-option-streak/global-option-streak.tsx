'use client'

// @Deprecate('Not Used')
import Image from 'next/image'
import { useStyle } from '@/ui/context/StyleContext'
import { AlertBar, Modal } from '../common-components'

const STYLE_ID = 'global_option_streak'

// 연속학습 모달
export function StreakModal({
  _viewStreakModal,
}: {
  _viewStreakModal?: (isView: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

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
          <div className={style.txt_l}>연속학습 {score}일 달성</div>
          <div className={style.date}>{date}</div>
        </div>
      </div>
    )
  }

  return (
    <Modal
      compact
      header
      title="연속학습"
      onClickDelete={() => {
        _viewStreakModal && _viewStreakModal(false)
      }}
      onClickLightbox={() => {
        _viewStreakModal && _viewStreakModal(false)
      }}>
      <div className={style.streak_modal}>
        <div className={style.streak_modal_body}>
          <div className="mg-bottom-m">
            <AlertBar>
              매일 1권 이상 학습을 완료하여 연속학습을 이어나가 보세요!
            </AlertBar>
          </div>
          {/* 연속학습 달성 기록이 있을 때 */}
          <>
            <div className={style.advance_notice}>
              <div className={style.txt_p}>120일 달성까지 13일 남았어요!</div>
            </div>
            <CheckPoint
              score={40}
              date="2023.10.21"
              imgSrc="/src/images/@streak-modal/badges/badge_40days.svg"
            />
            <CheckPoint
              score={20}
              date="2023.10.21"
              imgSrc="/src/images/@streak-modal/badges/badge_20days.svg"
            />
            <div className={style.start_point}>
              <div className={style.txt_p}>시작!</div>
            </div>
          </>
          {/* 연속학습 달성 기록이 없을 때 */}
          {/* <EmptyMessage isAward>
            아직 연속학습 달성 기록이 없어요. <br />
            매일 1권 이상의 학습을 20일간 연속으로 완료해 보세요!
          </EmptyMessage> */}
        </div>
        <div className={style.streak_modal_bottom}>
          <div className={style.streak_status}>
            <div className={style.txt_l}>
              윤서연님은 <span className="color-blue">연속학습</span>
            </div>
            <div className={style.score}>
              <span>300</span>
            </div>
            <div className={style.txt_l}>
              <span className="color-blue">일째 달성</span>중!!
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
