'use client'

// @Deprecate('Not Used')
import './global-option-level-bg-color.scss'
import Image from 'next/image'
import { useState } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import {
  AlertBar,
  Modal,
  Nav,
  NavItem,
  ProgressBar,
} from '../common-components'

const STYLE_ID = 'global_option_quest'

// 퀘스트 모달
export function QuestModal({
  _viewQuestModal,
}: {
  _viewQuestModal?: (isView: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  const [isDodoAndFriends, _isDodoAndFriends] = useState(true)
  const [isLevelMaster, _isLevelMaster] = useState(false)

  return (
    <Modal
      header
      compact
      title={'퀘스트'}
      onClickDelete={() => {
        _viewQuestModal && _viewQuestModal(false)
      }}
      onClickLightbox={() => {
        _viewQuestModal && _viewQuestModal(false)
      }}>
      <div className={style.quest_modal}>
        <Nav>
          <NavItem
            active={isDodoAndFriends}
            onClick={() => {
              _isDodoAndFriends(true)
              _isLevelMaster(false)
            }}
            width="100%">
            도도와 친구들
          </NavItem>
          <NavItem
            active={isLevelMaster}
            onClick={() => {
              _isDodoAndFriends(false)
              _isLevelMaster(true)
            }}
            width="100%">
            레벨 마스터
          </NavItem>
        </Nav>
        <div className={style.quest_modal_body}>
          {isDodoAndFriends && <DodoAndFriends />}
          {isLevelMaster && <LevelMasterProgress />}
        </div>
        <div className={style.quest_modal_bottom}>
          {isDodoAndFriends && (
            <FriendsBottom
              imgSrc="https://wcfresource.a1edu.com/newsystem/image/character/dodofriends/baro-004.png"
              currentEarnPoint={15.3}
              goalPoint={20}
            />
          )}
          {isLevelMaster && (
            <LevelMasterProgressBottom
              imgSrc="/src/images/@level-master-progress/progress/level_hexagon_prek.svg"
              currentEarnPoint={80.2}
              goalPoint={100}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}

// 퀘스트 모달 > 도도 앤 프렌즈
const DodoAndFriends = () => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.dodo_and_friends}>
      <div className={style.comment}>
        <AlertBar>
          학습 포인트를 모아서 친구들의 성장 스토리를 잠금 해제하세요!
        </AlertBar>
      </div>
      <div className={style.intro_button}>
        <span>인트로</span>
        <Image
          alt=""
          src="/src/images/play-icons/play_white.svg"
          width={30}
          height={30}
        />
      </div>
      <FriendsEntry
        imgSrc="/src/sample-images/baro.png"
        title="바로의 성장 스토리"
        story="나는 다락방 옥수수들의 정신적인 지주, 바로야. 어떤 상황에서도 용기와
        희망을 잃지 않지. 도도와 만났을 때, 난 해적 선장이 되었지. 내 꿈은
        넓은 세계를 누비며 모험하는 거야."
      />
      <FriendsStory
        isLock={false}
        title="해적"
        story="친구들! 드디어 꿈에 그리던 해적이 되었어! 모두들 내 활약을 기대하라구!"
        imgSrc="https://wcfresource.a1edu.com/newsystem/image/character/dodofriends/baro-001.png"
        imgSrcGif="https://wcfresource.a1edu.com/newsystem/image/character/dodofriends/motion/baro-002.gif"
      />
      <FriendsStory
        isLock={true}
        title="해적"
        story="친구들! 드디어 꿈에 그리던 해적이 되었어! 모두들 내 활약을 기대하라구!"
        imgSrc="https://wcfresource.a1edu.com/newsystem/image/character/dodofriends/baro-001.png"
        imgSrcGif="https://wcfresource.a1edu.com/newsystem/image/character/dodofriends/motion/baro-002.gif"
      />
      <div className={style.bridge}></div>
      <div className={style.ending_button}>
        <span>엔딩</span>
        <Image
          alt=""
          src="/src/images/play-icons/play_white.svg"
          width={30}
          height={30}
        />
      </div>
    </div>
  )
}

// 퀘스트 모달 > 도도 앤 프렌즈 > 프렌즈 소개(시놉시스)
const FriendsEntry = ({
  imgSrc,
  title,
  story,
}: {
  imgSrc: string
  title: string
  story: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.bridge}></div>
      <div className={style.friends_entry}>
        <div>
          <Image alt="" src={imgSrc} width={100} height={100} />
        </div>
        <div className={style.friends_entry_text}>
          <div className={style.title}>{title}</div>
          <div className={style.story}>{story}</div>
        </div>
      </div>
    </>
  )
}

// 퀘스트 모달 > 도도 앤 프렌즈 > 프렌즈 스토리
const FriendsStory = ({
  imgSrc,
  imgSrcGif,
  isLock,
  title,
  story,
  unlockPoint,
}: {
  imgSrc: string
  imgSrcGif: string
  isLock: boolean
  title: string
  story: string
  unlockPoint?: string
}) => {
  const style = useStyle(STYLE_ID)

  const [openCard, _openCard] = useState(false)

  return (
    <>
      <div className={style.bridge}></div>
      <div
        className={`${style.friends_story} ${isLock && style.lock} ${
          openCard && style.open
        }`}
        onClick={() => {
          !isLock && openCard == false && _openCard(true)
        }}>
        {openCard ? (
          <img src={imgSrcGif} alt="" width="100%" />
        ) : (
          <img src={imgSrc} alt="" width="100%" style={{ cursor: 'pointer' }} />
        )}
        {openCard && (
          <div
            className={style.delete_button}
            onClick={() => {
              _openCard(false)
            }}>
            <Image
              alt=""
              src="/src/images/delete-icons/x_black.svg"
              width={30}
              height={30}
            />
          </div>
        )}
      </div>
      {isLock && unlockPoint && (
        <div className={style.unlock_point_container}>
          <div className={style.unlock_point}>{unlockPoint}P</div>
        </div>
      )}
      {openCard && (
        <div className={style.friends_story_text}>
          <div className={style.title}>{title}</div>
          <div className={style.summary}>{story}</div>
        </div>
      )}
    </>
  )
}

// 퀘스트 모달 > 도도 앤 프렌즈 > 진행상태 (하단 고정)
const FriendsBottom = ({
  imgSrc,
  currentEarnPoint,
  goalPoint,
}: {
  imgSrc: string
  currentEarnPoint: number
  goalPoint: number
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.current_unit}>
        <img src={imgSrc} alt="" width="100%" />
      </div>
      <div className={style.status}>
        <div className={style.comment}>
          <span className="color-gray-dark">다음 스토리 잠금 해제까지</span>
          <span>
            {currentEarnPoint}/{goalPoint}P
          </span>
        </div>
        <ProgressBar slim width={`${(currentEarnPoint / goalPoint) * 100}%`} />
      </div>
    </>
  )
}

// 퀘스트 모달 > 레벨 마스터
const LevelMasterProgress = () => {
  const style = useStyle(STYLE_ID)

  const [viewProgressList, _viewProgressList] = useState(true)
  const [viewBadgeList, _viewBadgeList] = useState(false)

  return (
    <div className={style.level_master_progress}>
      <div className={style.comment}>
        <AlertBar>
          레벨별 학습 포인트를 모아서 레벨 마스터를 달성해 보세요!
        </AlertBar>
      </div>
      <div className={style.level_master_lists}>
        <div className={style.tabs}>
          <div
            className={`${style.tab_item} ${viewProgressList && style.active}`}
            onClick={() => {
              _viewProgressList(true)
              _viewBadgeList(false)
            }}>
            <span>진행중인 레벨</span>
          </div>
          <div
            className={`${style.tab_item} ${viewBadgeList && style.active}`}
            onClick={() => {
              _viewProgressList(false)
              _viewBadgeList(true)
            }}>
            <span>완료한 레벨</span>
          </div>
        </div>
        {viewProgressList && (
          <div className={style.level_master_progress_lists}>
            <LevelMasterProgressItem
              imgSrc="/src/images/@level-master-progress/progress/level_hexagon_prek.svg"
              currentEarnPoint={80.2}
              goalPoint={100}
              passed={80}
              bgColor={'level_PreK'}
              viewProgress
            />
            <LevelMasterProgressItem
              imgSrc="/src/images/@level-master-progress/progress/level_hexagon_kb.svg"
              currentEarnPoint={80.2}
              goalPoint={100}
              passed={80}
              bgColor={'level_KB'}
              viewProgress
            />
            <LevelMasterProgressItem
              imgSrc="/src/images/@level-master-progress/progress/level_hexagon_kc.svg"
              currentEarnPoint={80.2}
              goalPoint={100}
              passed={80}
              bgColor={'level_KC'}
              viewProgress
            />
            <LevelMasterProgressItem
              imgSrc="/src/images/@level-master-progress/progress/level_hexagon_1b.svg"
              currentEarnPoint={80.2}
              goalPoint={100}
              passed={80}
              bgColor={'level_1B'}
              viewProgress
            />
          </div>
        )}
        {viewBadgeList && (
          <div className={style.level_master_award_item}>
            <LevelMasterProgressItem
              imgSrc="/src/images/@level-master-progress/badge/level_ka.svg"
              currentEarnPoint={100}
              goalPoint={100}
              passed={100}
              bgColor={'level_KA'}
            />
            <LevelMasterProgressItem
              imgSrc="/src/images/@level-master-progress/badge/level_1a.svg"
              currentEarnPoint={100}
              goalPoint={100}
              passed={100}
              bgColor={'level_1A'}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// 퀘스트 모달 > 레벨 마스터 > 레벨 마스터 상태 아이템
const LevelMasterProgressItem = ({
  imgSrc,
  currentEarnPoint,
  goalPoint,
  passed,
  bgColor,
  viewProgress,
}: {
  imgSrc: string
  currentEarnPoint: number
  goalPoint: number
  passed: number
  bgColor: string
  viewProgress?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.level_master_progress_item} ${bgColor}`}>
      <div className={`${style.info} ${!viewProgress && style.master}`}>
        <div className={`${style.symbol} ${!viewProgress && style.master}`}>
          <div
            className={`${style.symbol_image} ${
              !viewProgress && style.master
            }`}>
            <Image
              alt=""
              src={imgSrc}
              width={viewProgress ? 90 : 105}
              height={viewProgress ? 90 : 105}
            />
          </div>
        </div>
        <div className={`${style.status} ${!viewProgress && style.master}`}>
          <div className={style.label}>획득한 포인트</div>
          <div className={style.data}>
            {currentEarnPoint}/{goalPoint}P
          </div>
          <div className={style.label}>읽은 권 수</div>
          <div className={style.data}>{passed}권</div>
        </div>
      </div>
      {viewProgress && (
        <ProgressBar slim width={`${(currentEarnPoint / goalPoint) * 100}%`} />
      )}
    </div>
  )
}

// 퀘스트 모달 > 레벨 마스터 > 진행상태 (하단 고정)
const LevelMasterProgressBottom = ({
  imgSrc,
  currentEarnPoint,
  goalPoint,
}: {
  imgSrc: string
  currentEarnPoint: number
  goalPoint: number
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.current_progress}>
        <img src={imgSrc} alt="" width="100%" />
      </div>
      <div className={style.progress_status}>
        <div className={style.comment}>
          <span>현재 학습 중인 레벨</span>
          <span>
            {currentEarnPoint}/{goalPoint}P
          </span>
        </div>
        <ProgressBar slim width={`${(currentEarnPoint / goalPoint) * 100}%`} />
      </div>
    </>
  )
}
