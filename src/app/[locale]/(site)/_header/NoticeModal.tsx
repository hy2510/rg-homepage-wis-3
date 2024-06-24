'use client'

import Image from 'next/image'
import { Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'global_option_notice'

// 알림 모달
export function NoticeModal({
  _viewNoticeModal,
}: {
  _viewNoticeModal?: (isView: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  const noticeIcon = {
    notice: '/src/images/@notice-modal/notice-icon/speaker.svg',
    point: '/src/images/@notice-modal/notice-icon/coin.svg',
    dailyGoal: '/src/images/@notice-modal/notice-icon/target.svg',
    challengeGoal: '/src/images/@notice-modal/notice-icon/trophy.svg',
    levelMaster: '/src/images/@notice-modal/notice-icon/badge_ka.svg',
  }

  return (
    <Modal
      compact
      header
      title="알림"
      onClickDelete={() => {
        _viewNoticeModal && _viewNoticeModal(false)
      }}
      onClickLightbox={() => {
        _viewNoticeModal && _viewNoticeModal(false)
      }}>
      <div className={style.notice_modal}>
        <div className={style.notice_modal_body}>
          <NoticeModalItem
            imgSrcIcon={noticeIcon.notice}
            noticeType="공지사항"
            noticeTitle="리딩게이트 새단장을 위한 베타버전 오픈"
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
          <hr className={style.hr} />
          <NoticeModalItem
            imgSrcIcon={noticeIcon.point}
            noticeType="학습 결과"
            noticeTitle="학습을 완료하여 10.2P를 획득했어요."
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
          <NoticeModalItem
            imgSrcIcon={noticeIcon.dailyGoal}
            noticeType="일일 목표"
            noticeTitle="일일목표를 달성했어요."
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
          <NoticeModalItem
            imgSrcIcon={noticeIcon.dailyGoal}
            noticeType="연속 학습"
            noticeTitle="연속 학습을 달성했어요."
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
          <NoticeModalItem
            imgSrcIcon={noticeIcon.levelMaster}
            noticeType="퀘스트 / 레벨 마스터"
            noticeTitle="Level KA를 마스터했어요."
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
          <NoticeModalItem
            imgSrcIcon={noticeIcon.dailyGoal}
            noticeType="어워드 / 연속 학습"
            noticeTitle="20일 연속 학습을 달성했어요."
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
          <NoticeModalItem
            imgSrcIcon={noticeIcon.dailyGoal}
            noticeType="어워드 / 일일 목표"
            noticeTitle="일일 목표를 25일 달성했어요."
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
          <NoticeModalItem
            imgSrcIcon={noticeIcon.dailyGoal}
            noticeType="챌린지 / 영어 독서왕"
            noticeTitle="영어 독서왕 챌린지에서 우수상에 도달했어요."
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
          <NoticeModalItem
            imgSrcIcon={noticeIcon.dailyGoal}
            noticeType="퀘스트 / 도도 앤 프렌즈"
            noticeTitle="Chello의 스토리가 해제되었어요"
            noticeDate="2023.10.31"
            _viewNoticeModal={_viewNoticeModal}
          />
        </div>
      </div>
    </Modal>
  )
}

// 알림 모달 > 알림 모달 아이템
const NoticeModalItem = ({
  check = false,
  imgSrcIcon,
  onClick,
  noticeType,
  noticeDate,
  noticeTitle,
  _viewNoticeModal,
}: {
  check?: boolean
  imgSrcIcon: string
  onClick?: () => void
  noticeType: string
  noticeDate: string
  noticeTitle: string
  _viewNoticeModal?: (isView: boolean) => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.notice_modal_item} ${check && style.check}`}>
      <div className={style.icon_image}>
        <Image alt="" src={imgSrcIcon} width={44} height={44} />
      </div>
      <div className={style.contents} onClick={onClick}>
        <div className={style.info}>
          <div className={style.notice_type}>{noticeType}</div>
          <div className={style.notice_date}>{noticeDate}</div>
        </div>
        <div className={style.notice_title}>{noticeTitle}</div>
      </div>
    </div>
  )
}
