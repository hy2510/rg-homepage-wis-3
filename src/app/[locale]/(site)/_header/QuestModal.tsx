import '@/ui/common/global-option-quest/global-option-level-bg-color.scss'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'
import { useAchieveLevelPoint } from '@/client/store/achieve/level-point/selector'
import { useSelectStudyLevel } from '@/client/store/student/daily-learning/selector'
import { useStudentInfo } from '@/client/store/student/info/selector'
import {
  AlertBar,
  Modal,
  Nav,
  NavItem,
  ProgressBar,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import { getDodoFriendsData } from './friends-data'

const STYLE_ID = 'global_option_quest'

// 퀘스트 모달
export function QuestModal({
  _viewQuestModal,
}: {
  _viewQuestModal?: (isView: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const [isDodoAndFriends, _isDodoAndFriends] = useState(true)
  const [isLevelMaster, _isLevelMaster] = useState(false)

  return (
    <Modal
      header
      compact
      title={t('t049')}
      onClickDelete={() => {
        _viewQuestModal && _viewQuestModal(false)
      }}
      onClickLightbox={() => {
        _viewQuestModal && _viewQuestModal(false)
      }}>
      <div className={style.quest_modal}>
        <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <Nav>
            <NavItem
              active={isDodoAndFriends}
              onClick={() => {
                _isDodoAndFriends(true)
                _isLevelMaster(false)
              }}
              width="100%">
              {t('t153')}
            </NavItem>
            <NavItem
              active={isLevelMaster}
              onClick={() => {
                _isDodoAndFriends(false)
                _isLevelMaster(true)
              }}
              width="100%">
              {t('t041')}
            </NavItem>
          </Nav>
        </div>
        {isDodoAndFriends && <DodoAndFriends />}
        {isLevelMaster && <LevelMasterProgress />}
      </div>
    </Modal>
  )
}

// 퀘스트 모달 > 도도 앤 프렌즈
const DodoAndFriends = () => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const point = useStudentInfo().payload.rgPoint
  const dodofriends = getDodoFriendsData('ko')

  let currentPoint = 0
  let destPoint = 0
  let nextImagePath = ''
  let nextProgress = 0
  // 50000 포인트는 도도프렌즈 카드의 최대 포인트로, 이 포인트를 초과하면 다음에 얻을 카드가 없음
  if (point < 50000) {
    const findIndex = dodofriends.findIndex((value) => point < value.maxPoint)
    currentPoint = Number(point.toFixed(2))
    if (findIndex >= 0) {
      let minPoint = 0
      let range = 0
      const list = dodofriends[findIndex].list
      const findChildIndex = list.findIndex((value) => point < value.point)
      if (findChildIndex >= 0) {
        destPoint = list[findChildIndex].point
        minPoint =
          findChildIndex - 1 < 0
            ? dodofriends[findIndex].minPoint
            : list[findChildIndex - 1].point
        nextImagePath = list[findChildIndex].imagePath
      } else if (findIndex + 1 < dodofriends.length) {
        destPoint = dodofriends[findIndex + 1].list[0].point
        minPoint =
          findIndex < 0
            ? 0
            : dodofriends[findIndex].list[
                dodofriends[findIndex].list.length - 1
              ].point
        nextImagePath = dodofriends[findIndex + 1].list[0].imagePath
      }
      range = destPoint - minPoint
      nextProgress = 100 - ((destPoint - point) / range) * 100
    }
  }

  return (
    <>
      <div className={style.quest_modal_body}>
        <div className={style.dodo_and_friends}>
          <div className={style.comment}>
            <AlertBar>{t('t154')}</AlertBar>
          </div>
          {dodofriends.map((friend) => {
            return (
              <div key={friend.id}>
                {/* <div className={style.intro_button}>
                  <span>인트로</span>
                  <Image
                    alt=""
                    src="/src/images/play-icons/play_white.svg"
                    width={30}
                    height={30}
                  />
                </div> */}
                <FriendsEntry
                  imgSrc={
                    point < friend.minPoint
                      ? friend.lockImagePath
                      : friend.imagePath
                  }
                  title={friend.title}
                  story={friend.description}
                />
                {friend.list.map((card, i) => {
                  return (
                    <FriendsStory
                      key={`${friend.id}_${i}`}
                      isLock={point < card.point}
                      title={card.title}
                      story={card.description}
                      imgSrc={card.imagePath}
                      imgSrcGif={card.imagePath2}
                    />
                  )
                })}
                <div className={style.bridge}></div>
                {/* <div className={style.ending_button}>
                  <span>엔딩</span>
                  <Image
                    alt=""
                    src="/src/images/play-icons/play_white.svg"
                    width={30}
                    height={30}
                  />
                </div>
                <br /> */}
              </div>
            )
          })}
        </div>
      </div>
      {nextImagePath && (
        <div className={style.quest_modal_bottom}>
          <FriendsBottom
            imgSrc={nextImagePath}
            currentEarnPoint={currentPoint}
            goalPoint={destPoint}
            progress={nextProgress}
          />
        </div>
      )}
    </>
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
  progress,
}: {
  imgSrc: string
  currentEarnPoint: number
  goalPoint: number
  progress: number
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <>
      <div className={style.current_unit}>
        <img src={imgSrc} alt="" width="100%" />
      </div>
      <div className={style.status}>
        <div className={style.comment}>
          <span className="color-gray-dark">{t('t155')}</span>
          <span>
            {currentEarnPoint}/{goalPoint}P
          </span>
        </div>
        <ProgressBar slim width={`${progress}%`} />
      </div>
    </>
  )
}

// 퀘스트 모달 > 레벨 마스터
const LevelMasterProgress = () => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const defaultLevel = useSelectStudyLevel()
  const levelPoints = useAchieveLevelPoint().payload

  const [filterTab, setFilterTab] = useState<'all' | 'complete'>('all')
  const levelItems =
    filterTab === 'all'
      ? levelPoints
      : levelPoints.filter(
          (level) =>
            level.requiredRgPoint - level.myRgPoint <= 0 &&
            level.levelName !== '6C',
        )
  const myLevel = levelPoints.filter(
    (level) => level.levelName === defaultLevel,
  )
  const myLevelBadge =
    myLevel && myLevel.length > 0
      ? `/src/images/@level-master-progress/progress/level_hexagon_${
          myLevel[0].levelName === 'PK'
            ? 'prek'
            : myLevel[0].levelName.toLocaleLowerCase()
        }.svg`
      : undefined
  const myLevelPoint = myLevelBadge ? myLevel[0].myRgPoint : 0
  const myLevelMaxPoint = myLevelBadge ? myLevel[0].requiredRgPoint : 0
  const myLevelName = myLevelBadge ? myLevel[0].levelName : ''

  return (
    <>
      <div className={style.quest_modal_body}>
        <div className={style.level_master_progress}>
          <div className={style.comment}>
            <AlertBar>{t('t156')}</AlertBar>
          </div>
          <div className={style.level_master_lists}>
            <div className={style.tabs}>
              <div
                className={`${style.tab_item} ${
                  filterTab === 'all' && style.active
                }`}
                onClick={() => {
                  setFilterTab('all')
                }}>
                <span>{t('t157')}</span>
              </div>
              <div
                className={`${style.tab_item} ${
                  filterTab === 'complete' && style.active
                }`}
                onClick={() => {
                  setFilterTab('complete')
                }}>
                <span>{t('t158')}</span>
              </div>
            </div>
            {filterTab === 'all' ? (
              <div className={style.level_master_progress_lists}>
                {levelItems.map((level) => {
                  const imgPath = `/src/images/@level-master-progress/progress/level_hexagon_${
                    level.levelName === 'PK'
                      ? 'prek'
                      : level.levelName.toLocaleLowerCase()
                  }.svg`
                  const colorName = `level_${
                    level.levelName === 'PK' ? 'PreK' : level.levelName
                  }`
                  return (
                    <LevelMasterProgressItem
                      key={`level_master_${level.levelName}`}
                      imgSrc={imgPath}
                      currentEarnPoint={level.myRgPoint}
                      goalPoint={level.requiredRgPoint}
                      passed={level.books}
                      bgColor={colorName}
                      viewProgress={level.levelName !== '6C'}
                    />
                  )
                })}
              </div>
            ) : (
              <div className={style.level_master_award_item}>
                {levelItems.map((level) => {
                  const imgPath = `/src/images/@level-master-progress/badge/level_${
                    level.levelName === 'PK'
                      ? 'prek'
                      : level.levelName.toLocaleLowerCase()
                  }.svg`
                  const colorName = `level_${
                    level.levelName === 'PK' ? 'PreK' : level.levelName
                  }`
                  return (
                    <LevelMasterProgressItem
                      key={`level_master_${level.levelName}`}
                      imgSrc={imgPath}
                      currentEarnPoint={level.myRgPoint}
                      goalPoint={level.requiredRgPoint}
                      passed={level.books}
                      bgColor={colorName}
                      viewProgress={level.levelName !== '6C'}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {myLevelBadge && (
        <div className={style.quest_modal_bottom}>
          <LevelMasterProgressBottom
            imgSrc={myLevelBadge}
            levelName={myLevelName}
            currentEarnPoint={myLevelPoint}
            goalPoint={myLevelMaxPoint}
          />
        </div>
      )}
    </>
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

  // @language 'common'
  const { t } = useTranslation()

  const progress = Math.min((currentEarnPoint / goalPoint) * 100, 100)

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
          <div className={style.label}>{t('t160')}</div>
          <div className={style.data}>
            {currentEarnPoint}/{goalPoint}P
          </div>
          <div className={style.label}>{t('t161')}</div>
          <div className={style.data}>{t('t023', { num: passed })}</div>
        </div>
      </div>
      {viewProgress && <ProgressBar slim width={`${progress}%`} />}
    </div>
  )
}

// 퀘스트 모달 > 레벨 마스터 > 진행상태 (하단 고정)
const LevelMasterProgressBottom = ({
  imgSrc,
  levelName,
  currentEarnPoint,
  goalPoint,
}: {
  imgSrc: string
  levelName: string
  currentEarnPoint: number
  goalPoint: number
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const progress = Math.min((currentEarnPoint / goalPoint) * 100, 100)
  return (
    <>
      <div className={style.current_progress}>
        <img src={imgSrc} alt="" width="100%" />
      </div>
      <div className={style.progress_status}>
        <div className={style.comment}>
          <span>{t('t043')}</span>
          <span>
            {currentEarnPoint}/{goalPoint}P
          </span>
        </div>
        {levelName !== '6C' && <ProgressBar slim width={`${progress}%`} />}
      </div>
    </>
  )
}
