'use client'

import '@/ui/common/global-option-my-rg/global-option-level-bg-color.scss'
import { useChatbotController } from '@/app/_context/ChatbotContext'
import { goToLevelTest } from '@/app/_function/study-start'
import useLogout from '@/app/_function/use-logout'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useOnLoadAchieveLevelMaster } from '@/client/store/achieve/level-master/hook'
import { useAchieveLevelMaster } from '@/client/store/achieve/level-master/selector'
import { useAchieveLevelPoint } from '@/client/store/achieve/level-point/selector'
import { useOnLoadAchieveLevelTest } from '@/client/store/achieve/level-test/hook'
import { useAchieveLevelTest } from '@/client/store/achieve/level-test/selector'
import { useOnLoadReadingKingTrophy } from '@/client/store/achieve/readingking-trophy/hook'
import { useAchieveReadingKingTrophy } from '@/client/store/achieve/readingking-trophy/selector'
import { useOnLoadSuccessiveDailyGoal } from '@/client/store/achieve/successive-daily-goal/hook'
import { useAchieveSuccessiveDailyGoal } from '@/client/store/achieve/successive-daily-goal/selector'
import { useOnLoadSuccessiveStudy } from '@/client/store/achieve/successive-study/hook'
import { useAchieveSuccessiveStudy } from '@/client/store/achieve/successive-study/selector'
import { useLibraryFavorite } from '@/client/store/library/favorites/selector'
import { useLibraryTodo } from '@/client/store/library/todos/selector'
import { useFetchSetStudentAvatar } from '@/client/store/student/avatar/hook'
import { useStudentAvatar } from '@/client/store/student/avatar/selector'
import {
  useFetchSetStudentDailyLearning,
  useFetchSetStudentDailyLearningLevel,
  useOnLoadStudentDailyLearningHistory,
} from '@/client/store/student/daily-learning/hook'
import {
  useSelectStudyLevel,
  useStudentDailyLearning,
} from '@/client/store/student/daily-learning/selector'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { useOnLoadLevelTestInfo } from '@/client/store/student/level-test-info/hook'
import { useLevelTestInfo } from '@/client/store/student/level-test-info/selector'
import { useStudentTodayStudy } from '@/client/store/student/today-study/selector'
import {
  AlertBar,
  Button,
  EmptyMessage,
  Modal,
  Nav,
  NavItem,
  SelectBox,
  SelectBoxItem,
  TextField,
} from '@/ui/common/common-components'
import { useStyle, useThemeMode } from '@/ui/context/StyleContext'
import { SetStudyMode } from './SetStudyMode'

const STYLE_ID = 'global_option_my_rg'

/** 연속 학습일 아이템은 최대 300일 까지만 획득 가능 */
const CONTINUOUS_MAX_DAY = 300
/** 일일 목표 완료 아이템은 최대 1050회 까지만 획득 가능 */
const DAILY_SUCCESS_MAX_STUDY = 1050

// My RG 모달
export function MyRgModal({
  _viewMyRgModal,
}: {
  _viewMyRgModal?: (isView: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { loading: awardGoalLoading } = useOnLoadSuccessiveDailyGoal()
  const { loading: awardStudyLoading } = useOnLoadSuccessiveStudy()
  const { loading: awardLevelMasterLoading } = useOnLoadAchieveLevelMaster()
  const { loading: awardReadingKingLoading } = useOnLoadReadingKingTrophy()

  const [isMyRg, _isMyRg] = useState(true)
  const [isMyProfile, _isMyProfile] = useState(false)
  const [isEditProfile, _isEditProfile] = useState(false)
  const [isChooseAvatar, _isChooseAvatar] = useState(false)
  const [isDailyGoalAward, _isDailyGoalAward] = useState(false)
  const [isStreakAward, _isStreakAward] = useState(false)
  const [isChallengeAward, _isChallengeAward] = useState(false)
  const [isLevelMasterAward, _isLevelMasterAward] = useState(false)
  const [isDailyGoalSetting, _isDailyGoalSetting] = useState(false)
  const [isMyStudyLevel, _isMyStudyLevel] = useState(false)
  const [isSetStudyMode, _isSetStudyMode] = useState(false)
  const headerTitle = isMyRg
    ? t('t034')
    : isMyProfile
      ? t('t035')
      : isEditProfile
        ? t('t036')
        : isChooseAvatar
          ? t('t037')
          : isDailyGoalAward
            ? t('t038')
            : isStreakAward
              ? t('t039')
              : isChallengeAward
                ? t('t040')
                : isLevelMasterAward
                  ? t('t041')
                  : isDailyGoalSetting
                    ? t('t042')
                    : isMyStudyLevel
                      ? t('t043')
                      : isSetStudyMode
                        ? t('t044')
                        : undefined

  const avatar = useStudentAvatar().payload
  const [avatarId, setAvatarId] = useState(avatar.avatarId || '097971')
  const onChangeAvatar = (avatarId: string) => {
    // _isEditProfile(true)
    // _isChooseAvatar(false)

    setAvatarId(avatarId)
    _isMyRg(true)
    _isChooseAvatar(false)
  }
  const filteredAvatar = avatar.avatars.filter(
    (item) => item.avatarId === avatarId,
  )
  const avatarImage =
    filteredAvatar.length > 0
      ? filteredAvatar[0].imgAvatarList
      : 'https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_03.png'

  const onLogout = useLogout()

  const chatbotController = useChatbotController()

  return (
    <Modal
      compact
      header={isMyRg}
      navTop={!isMyRg}
      title={headerTitle}
      onClickDelete={() => {
        if (isMyRg) {
          _viewMyRgModal && _viewMyRgModal(false)
          _isMyRg(true)
          _isMyProfile(false)
          _isDailyGoalSetting(false)
          _isSetStudyMode(false)
        }
      }}
      onClickBack={() => {
        if (isMyProfile) {
          _isMyRg(true)
          _isMyProfile(false)
        }
        if (isEditProfile) {
          _isMyProfile(true)
          _isEditProfile(false)

          setAvatarId(avatar.avatarId)
        }
        if (isChooseAvatar) {
          _isMyRg(true)
          _isChooseAvatar(false)
        }
        if (isDailyGoalAward) {
          _isMyRg(true)
          _isDailyGoalAward(false)
        }
        if (isStreakAward) {
          _isMyRg(true)
          _isStreakAward(false)
        }
        if (isChallengeAward) {
          _isMyRg(true)
          _isChallengeAward(false)
        }
        if (isLevelMasterAward) {
          _isMyRg(true)
          _isLevelMasterAward(false)
        }
        if (isDailyGoalSetting) {
          _isMyRg(true)
          _isDailyGoalSetting(false)
        }
        if (isMyStudyLevel) {
          _isMyRg(true)
          _isMyStudyLevel(false)
        }
        if (isSetStudyMode) {
          _isMyRg(true)
          _isSetStudyMode(false)
        }
      }}
      onClickLightbox={() => {
        _viewMyRgModal && _viewMyRgModal(false)
        _isMyRg(true)
        _isMyProfile(false)
        _isEditProfile(false)
        _isChooseAvatar(false)
        _isDailyGoalAward(false)
        _isStreakAward(false)
        _isChallengeAward(false)
        _isLevelMasterAward(false)
        _isDailyGoalSetting(false)
        _isMyStudyLevel(false)
        _isSetStudyMode(false)
      }}>
      <div className={style.my_rg_modal}>
        {isMyRg && (
          <MyRg
            avatarId={avatarId}
            onClickMyRgUserCard={() => {
              _isMyRg(false)
              _isMyProfile(true)
            }}
            onClickChooseAvatar={() => {
              _isMyRg(false)
              _isChooseAvatar(true)
            }}
            onClickTodo={() => {
              _viewMyRgModal && _viewMyRgModal(false)
              _isMyRg(true)
            }}
            onClickFavorite={() => {
              _viewMyRgModal && _viewMyRgModal(false)
              _isMyRg(true)
            }}
            onClickDailyGoalSetting={() => {
              _isMyRg(false)
              _isDailyGoalSetting(true)
            }}
            onClickMyStudyLevel={() => {
              _isMyRg(false)
              _isMyStudyLevel(true)
            }}
            onClickDailyGoalAward={() => {
              _isMyRg(false)
              _isDailyGoalAward(true)
            }}
            onClickStreakAward={() => {
              _isMyRg(false)
              _isStreakAward(true)
            }}
            onClickChallengeAward={() => {
              _isMyRg(false)
              _isChallengeAward(true)
            }}
            onClickLevelMasterAward={() => {
              _isMyRg(false)
              _isLevelMasterAward(true)
            }}
            onClickAccountInfo={() => {
              _viewMyRgModal && _viewMyRgModal(false)
              _isMyRg(false)
            }}
            onClickSetStudyMode={() => {
              _isMyRg(false)
              _isSetStudyMode(true)
            }}
            onClickChatbot={() => {
              _viewMyRgModal && _viewMyRgModal(false)
              _isMyRg(false)
              chatbotController.showChat()
            }}
            onClickLogout={() => {
              _viewMyRgModal && _viewMyRgModal(false)
              _isMyRg(false)
              onLogout()
            }}
          />
        )}
        {isMyProfile && (
          <MyProfile
            onClickEditProfile={() => {
              _isMyProfile(false)
              _isEditProfile(true)
            }}
            onClickDailyGoalAward={() => {
              _isMyProfile(false)
              _isDailyGoalAward(true)
            }}
            onClickStreakAward={() => {
              _isMyProfile(false)
              _isStreakAward(true)
            }}
            onClickChallengeAward={() => {
              _isMyProfile(false)
              _isChallengeAward(true)
            }}
            onClickLevelMasterAward={() => {
              _isMyProfile(false)
              _isLevelMasterAward(true)
            }}
          />
        )}
        {isEditProfile && (
          <EditProfile
            selectedAvatar={avatarId}
            avatarImage={avatarImage}
            onClickChangeAvatar={() => {
              _isEditProfile(false)
              _isChooseAvatar(true)
            }}
          />
        )}
        {isChooseAvatar && (
          <ChooseAvatar
            defaultAvatar={avatarId}
            onChangeAvatar={onChangeAvatar}
          />
        )}
        {isDailyGoalAward && <DailyGoalAward />}
        {isStreakAward && <StreakAward />}
        {isChallengeAward && <ChallengeAward />}
        {isLevelMasterAward && <LevelMasterAward />}
        {isDailyGoalSetting && <DailyGoalSetting />}
        {isMyStudyLevel && <MyStudyLevel />}
        {isSetStudyMode && <SetStudyMode />}
      </div>
    </Modal>
  )
}

// My RG
export function MyRg({
  avatarId,
  onClickMyRgUserCard,
  _isMyRg,
  _isMyProfile,
  onClickTodo,
  onClickFavorite,
  onClickChooseAvatar,
  onClickDailyGoalSetting,
  onClickMyStudyLevel,
  onClickChallengeAward,
  onClickDailyGoalAward,
  onClickStreakAward,
  onClickLevelMasterAward,
  onClickAccountInfo,
  onClickSetStudyMode,
  onClickChatbot,
  onClickLogout,
}: {
  avatarId: string
  onClickMyRgUserCard?: () => void
  _isMyRg?: () => void
  _isMyProfile?: () => void
  onClickTodo?: () => void
  onClickFavorite?: () => void
  onClickChooseAvatar?: () => void
  onClickDailyGoalSetting?: () => void
  onClickMyStudyLevel?: () => void
  onClickChallengeAward?: () => void
  onClickDailyGoalAward?: () => void
  onClickStreakAward?: () => void
  onClickLevelMasterAward?: () => void
  onClickAccountInfo?: () => void
  onClickSetStudyMode?: () => void
  onClickChatbot?: () => void
  onClickLogout?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const student = useStudentInfo().payload
  const studyLearning = useStudentDailyLearning().payload
  const studyTodayLearning = useStudentTodayStudy().payload

  const awardGoal = useAchieveSuccessiveDailyGoal().payload
  const awardStudy = useAchieveSuccessiveStudy().payload
  const awardLevelMaster = useAchieveLevelMaster().payload
  const awardReadingKing = useAchieveReadingKingTrophy().payload

  const todoCount = useLibraryTodo().count
  const favoriteCount = useLibraryFavorite().count

  const studyLevel = studyLearning.settingLevelName
  const studyType = studyLearning.settingType === 'Books' ? 'book' : 'point'
  const studyGoal =
    studyType === 'book' ? studyLearning.books : studyLearning.point
  const studyProgress =
    studyType === 'book' ? studyTodayLearning.books : studyTodayLearning.point

  const avatar = useStudentAvatar().payload
  const filteredAvatar = avatar.avatars.filter(
    (item) => item.avatarId === avatarId,
  )
  const avatarImage =
    filteredAvatar.length > 0
      ? filteredAvatar[0].imgAvatarList
      : 'https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_03.png'

  return (
    <div className={style.my_rg}>
      <MyRgUseEndDate useEndDate={student.studyEndDay} />
      <TotalStudyScore
        userGrade={student.gradeName}
        studentName={student.name}
        userAvatar={avatarImage}
        totalPassed={student.brCount}
        totalEarnPoints={Number(student.rgPoint.toFixed(2))}
        onClick={onClickChooseAvatar}
      />
      <MyRgAssignmentInfo
        onClickTodo={onClickTodo}
        onClickFavorite={onClickFavorite}
        todoAssignNum={todoCount}
        favoriteAssignNum={favoriteCount}
      />
      <MyRgGoalInfo
        currentStudy={studyProgress}
        studyGoal={studyGoal}
        studyType={studyType}
        studyLevel={studyLevel}
        onClickDailyGoalSetting={onClickDailyGoalSetting}
        onClickMyStudyLevel={onClickMyStudyLevel}
      />
      <AwardListContainer>
        <AwardListItem
          tag={t('t045')}
          text={t('t038')}
          collectNum={
            awardGoal.filter(
              (item) =>
                item.achievedCount > 0 &&
                item.achievedCount <= DAILY_SUCCESS_MAX_STUDY,
            ).length
          }
          onClick={onClickDailyGoalAward}
        />
        <AwardListItem
          tag={t('t045')}
          text={t('t039')}
          collectNum={
            awardStudy.filter(
              (item) =>
                item.straightDayCount > 0 &&
                item.straightDayCount <= CONTINUOUS_MAX_DAY,
            ).length
          }
          onClick={onClickStreakAward}
        />
        <AwardListItem
          tag={t('t047')}
          text={t('t048')}
          collectNum={awardReadingKing.length}
          onClick={onClickChallengeAward}
        />
        <AwardListItem
          tag={t('t049')}
          text={t('t041')}
          collectNum={awardLevelMaster.length}
          onClick={onClickLevelMasterAward}
        />
      </AwardListContainer>
      <MyRgEtc
        onClickSetStudyMode={onClickSetStudyMode}
        onClickAccountInfo={onClickAccountInfo}
        onClickChatbot={onClickChatbot}
      />
      <div className={style.log_out}>
        <Button color="red" shadow onClick={onClickLogout}>
          {t('t050')}
        </Button>
      </div>
    </div>
  )
}

// My RG > 남은기간
const MyRgUseEndDate = ({ useEndDate }: { useEndDate: number }) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.my_rg_use_end_date}>
      <span>{t('t051')}</span>
      <span>
        <b>{t('t052', { num: useEndDate })}</b>
      </span>
    </div>
  )
}

// My RG > 사용자정보
const MyRgUserCard = ({
  avatarImage,
  grade,
  name,
  onClick,
}: {
  avatarImage: string
  grade: string
  name: string
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_rg_user_card} onClick={onClick}>
      <div className={style.user_info}>
        <div className={style.user_avatar}>
          <Image alt="" src={avatarImage} width={100} height={100} />
        </div>
        <div>
          <div className={style.user_grade}>{grade}</div>
          <div className={style.user_name}>{name}</div>
        </div>
      </div>
      <Image
        alt=""
        src="/src/images/arrow-icons/chv_right.svg"
        width={24}
        height={24}
      />
    </div>
  )
}

// My RG > 과제정보
const MyRgAssignmentInfo = ({
  onClickTodo,
  onClickFavorite,
  todoAssignNum,
  favoriteAssignNum,
}: {
  onClickTodo?: () => void
  onClickFavorite?: () => void
  todoAssignNum: number
  favoriteAssignNum: number
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_rg_assignment_info}>
      <div className={style.assignment_info_container}>
        <Link href={SITE_PATH.LIBRARY.TODO} onClick={onClickTodo}>
          <div className={style.to_do}>
            <div className={style.txt_l}>To-Do</div>
            <div className={style.count_num}>{todoAssignNum}</div>
          </div>
        </Link>
        <Link href={SITE_PATH.LIBRARY.FAVORITE} onClick={onClickFavorite}>
          <div className={style.favorite}>
            <div className={style.txt_l}>Favorite</div>
            <div className={style.count_num}>{favoriteAssignNum}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

// My RG > 학습목표
const MyRgGoalInfo = ({
  currentStudy,
  studyGoal,
  studyType,
  studyLevel,
  onClickDailyGoalSetting,
  onClickMyStudyLevel,
}: {
  currentStudy: number
  studyGoal: number
  studyType: 'point' | 'book'
  studyLevel: string
  onClickDailyGoalSetting?: () => void
  onClickMyStudyLevel?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const progressText =
    studyType === 'book'
      ? t('t053', { num1: currentStudy, num2: studyGoal })
      : t('t054', { num1: currentStudy, num2: studyGoal })
  return (
    <div className={style.my_rg_goal_info}>
      <div className={style.col_a} onClick={onClickDailyGoalSetting}>
        <div className={style.txt_l}>{t('t055')}</div>
        <div className={style.contents}>{progressText}</div>
      </div>
      <div className={style.col_b} onClick={onClickMyStudyLevel}>
        <div className={style.txt_l}>{t('t043')}</div>
        <div className={style.contents}>{studyLevel}</div>
      </div>
    </div>
  )
}

// My RG > 기타
const MyRgEtc = ({
  onClickSetStudyMode,
  onClickAccountInfo,
  onClickChatbot,
}: {
  onClickSetStudyMode?: () => void
  onClickAccountInfo?: () => void
  onClickChatbot?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.my_rg_etc}>
      <div className={style.etc_item}>
        <Link href={SITE_PATH.ACCOUNT.INFO} onClick={onClickAccountInfo}>
          <Image
            alt=""
            src="/src/images/@my-rg-modal/user_info.svg"
            width={50}
            height={50}
          />
          <div className={style.txt_l}>{t('t056')}</div>
        </Link>
      </div>
      <div className={style.etc_item} onClick={onClickSetStudyMode}>
        <Image
          alt=""
          src="/src/images/@my-rg-modal/set_study.svg"
          width={50}
          height={50}
        />
        <div className={style.txt_l}>{t('t044')}</div>
      </div>
      <div className={style.etc_item} onClick={onClickChatbot}>
        <Image
          alt=""
          src=" /src/images/@my-rg-modal/chatbot.svg"
          width={50}
          height={50}
        />
        <div className={style.txt_l}>{t('t057')}</div>
      </div>
    </div>
  )
}

// 나의 프로필
export function MyProfile({
  onClickEditProfile,
  onClickDailyGoalAward,
  onClickStreakAward,
  onClickChallengeAward,
  onClickLevelMasterAward,
}: {
  onClickEditProfile?: () => void
  onClickDailyGoalAward?: () => void
  onClickStreakAward?: () => void
  onClickChallengeAward?: () => void
  onClickLevelMasterAward?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const student = useStudentInfo().payload
  const avatar = useStudentAvatar().payload
  const avatarId = avatar.avatarId
  const filteredAvatar = avatar.avatars.filter(
    (item) => item.avatarId === avatarId,
  )
  const avatarImage =
    filteredAvatar.length > 0
      ? filteredAvatar[0].imgAvatarList
      : 'https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_03.png'

  const { loading: awardGoalLoading } = useOnLoadSuccessiveDailyGoal()
  const { loading: awardStudyLoading } = useOnLoadSuccessiveStudy()
  const { loading: awardLevelMasterLoading } = useOnLoadAchieveLevelMaster()
  const { loading: awardReadingKingLoading } = useOnLoadReadingKingTrophy()

  const awardGoal = useAchieveSuccessiveDailyGoal().payload
  const awardStudy = useAchieveSuccessiveStudy().payload
  const awardLevelMaster = useAchieveLevelMaster().payload
  const awardReadingKing = useAchieveReadingKingTrophy().payload

  return (
    <div className={style.my_profile}>
      <TotalStudyScore
        userGrade={student.gradeName}
        studentName={student.name}
        userAvatar={avatarImage}
        totalPassed={student.brCount}
        totalEarnPoints={Number(student.rgPoint.toFixed(2))}
        onClick={onClickEditProfile}
      />
      <AwardListContainer>
        <AwardListItem
          tag={t('t045')}
          text={t('t038')}
          collectNum={
            awardGoal.filter(
              (item) =>
                item.achievedCount > 0 &&
                item.achievedCount <= DAILY_SUCCESS_MAX_STUDY,
            ).length
          }
          onClick={onClickDailyGoalAward}
        />
        <AwardListItem
          tag={t('t045')}
          text={t('t046')}
          collectNum={
            awardStudy.filter(
              (item) =>
                item.straightDayCount > 0 &&
                item.straightDayCount <= CONTINUOUS_MAX_DAY,
            ).length
          }
          onClick={onClickStreakAward}
        />
        <AwardListItem
          tag={t('t047')}
          text={t('t048')}
          collectNum={awardReadingKing.length}
          onClick={onClickChallengeAward}
        />
        <AwardListItem
          tag={t('t049')}
          text={t('t041')}
          collectNum={awardLevelMaster.length}
          onClick={onClickLevelMasterAward}
        />
      </AwardListContainer>
    </div>
  )
}

// 나의 프로필 > 학습 총점
const TotalStudyScore = ({
  userGrade,
  studentName,
  userAvatar,
  totalPassed,
  totalEarnPoints,
  onClick,
}: {
  userGrade: string
  studentName: string
  userAvatar: string
  totalPassed: number
  totalEarnPoints: number
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.total_study_score}>
      <div className={style.student_info}>
        {/* <div className={style.user_grade}>{userGrade}</div> */}
        <div className={style.student_name}>
          <div className={style.txt_l}>{studentName}</div>
        </div>
        <div className={style.user_avatar}>
          <Image alt="" src={userAvatar} width={150} height={150} />
        </div>
        <div className={style.edit_button} onClick={onClick}>
          <Image
            alt=""
            src={'/src/images/pencil-icons/pencil_white_2.svg'}
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className={style.total_score_container}>
        <div className={style.col_a}>
          <div className={style.txt_l}>{t('t058')}</div>
          <div className={style.txt_d}>{t('t023', { num: totalPassed })}</div>
        </div>
        <div className={style.col_b}>
          <div className={style.txt_l}>{t('t060')}</div>
          <div className={style.txt_d}>{totalEarnPoints}P</div>
        </div>
      </div>
    </div>
  )
}

// 나의 프로필 > 어워드 리스트
const AwardListContainer = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.award_list_container}>{children}</div>
}

// 나의 프로필 > 어워드 아이템
const AwardListItem = ({
  text,
  tag,
  collectNum,
  onClick,
}: {
  text: string
  tag: string
  collectNum: number
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  const isDarkMode = useThemeMode() === 'dark'
  const iconPath = isDarkMode
    ? '/src/images/arrow-icons/chv_right_white.svg'
    : '/src/images/arrow-icons/chv_right.svg'

  return (
    <div className={style.award_list_item} onClick={onClick}>
      <div className={style.col_a}>
        <span className={style.txt_l}>{tag}</span>
        <span className={style.txt_p}>
          {text} {collectNum}
        </span>
      </div>
      <Image alt="" src={iconPath} width={24} height={24} />
    </div>
  )
}

// 프로필 수정
export function EditProfile({
  selectedAvatar,
  avatarImage,
  onClickChangeAvatar,
}: {
  selectedAvatar: string
  avatarImage: string
  onClickChangeAvatar?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const AGE_LIST = [
    { key: 'none', label: t('t062') },
    { key: '014025', label: t('t063') },
    { key: '014026', label: t('t064') },
    { key: '014013', label: t('t065') },
    { key: '014014', label: t('t066') },
    { key: '014015', label: t('t067') },
    { key: '014001', label: t('t068') },
    { key: '014002', label: t('t069') },
    { key: '014003', label: t('t070') },
    { key: '014004', label: t('t071') },
    { key: '014005', label: t('t072') },
    { key: '014006', label: t('t073') },
    { key: '014007', label: t('t074') },
    { key: '014008', label: t('t075') },
    { key: '014009', label: t('t076') },
    { key: '014010', label: t('t077') },
    { key: '014011', label: t('t078') },
    { key: '014012', label: t('t079') },
  ]

  const student = useStudentInfo().payload

  const [userName, setUserName] = useState(student.name)
  const [grade, setGrade] = useState(student.gradeCode)

  return (
    <div className={style.edit_profile}>
      <div className={style.user_avatar}>
        <div className={style.user_avatar_image}>
          <Image alt="" src={avatarImage} width={150} height={150} />
        </div>
        <div className={style.edit_button} onClick={onClickChangeAvatar}>
          <Image
            alt=""
            src="/src/images/pencil-icons/pencil_white_2.svg"
            width={20}
            height={20}
          />
        </div>
      </div>
      <TextField
        id={'edit-student-name'}
        hint={t('t080')}
        value={userName}
        onTextChange={(text) => {
          setUserName(text)
        }}
      />
      <SelectBox
        id={'select-student-grade'}
        hint={t('t081')}
        onChange={(e) => {
          setGrade(e.target.value)
        }}
        value={grade}>
        {AGE_LIST.map((age) => (
          <SelectBoxItem key={age.key} value={age.key}>
            {age.label}
          </SelectBoxItem>
        ))}
      </SelectBox>
      <Button
        shadow
        onClick={() => {
          //TODO FIXME API 개발 필요 !
          console.log(userName, selectedAvatar, grade)
        }}>
        {t('t082')}
      </Button>
    </div>
  )
}

// 아바타 수정
export function ChooseAvatar({
  defaultAvatar,
  onChangeAvatar,
}: {
  defaultAvatar: string
  onChangeAvatar?: (avatarId: string) => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const avatar = useStudentAvatar().payload
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar)

  const { fetch, loading, success } = useFetchSetStudentAvatar()
  useEffect(() => {
    if (success) {
      onChangeAvatar && onChangeAvatar(selectedAvatar)
    }
  }, [success, onChangeAvatar, selectedAvatar])

  if (success) {
    return <></>
  }
  return (
    <div className={style.choose_avatar}>
      <div className={style.choose_avatar_container}>
        {avatar.avatars.map((avatar) => {
          return (
            <div key={`choose_${avatar.avatarId}`}>
              <AvatarItem
                avtImgSrc={avatar.imgAccountList}
                avtName={avatar.nameEng}
                selected={selectedAvatar === avatar.avatarId}
                onClickAvatar={() => setSelectedAvatar(avatar.avatarId)}
              />
            </div>
          )
        })}
      </div>
      <Button
        shadow
        onClick={() => {
          if (!loading) {
            fetch(selectedAvatar)
          }
        }}>
        {t('t083')}
      </Button>
    </div>
  )
}

// 아바타 수정 > 아바타 아이템
const AvatarItem = ({
  selected,
  check,
  avtImgSrc,
  avtName,
  onClickAvatar,
}: {
  selected: boolean
  check?: boolean
  avtImgSrc: string
  avtName: string
  onClickAvatar?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={style.avatar_item}
      onClick={() => {
        onClickAvatar && onClickAvatar()
      }}>
      <div
        className={`${style.avatar} ${selected && style.selected} ${
          check && style.check
        }`}>
        <div
          className={style.avatar_image}
          style={{ backgroundImage: `url(${avtImgSrc})` }}></div>
      </div>
      <div className={`${style.avatar_name} ${selected && style.selected}`}>
        {avtName}
      </div>
    </div>
  )
}

// 일일 목표 달성 어워드
export function DailyGoalAward() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const awardGoal = useAchieveSuccessiveDailyGoal().payload

  return (
    <div className={style.daily_goal_award}>
      <AlertBar>{t('t084')}</AlertBar>
      {!awardGoal || awardGoal.length <= 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.daily_goal_award_list}>
          {awardGoal
            .filter(
              (award) =>
                award.achievedCount > 0 &&
                award.achievedCount <= DAILY_SUCCESS_MAX_STUDY,
            )
            .map((award, i) => {
              const image = `/src/images/@award-daily-goal/badge_${award.achievedCount}d.svg`
              const text = t('t086', { num: award.achievedCount })
              return (
                <div key={`goal_award_${i}`}>
                  <DailyGoalAwardItem
                    awardImgSrc={image}
                    awardName={text}
                    awardGetDate={award.achievedDate}
                  />
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

// 목표 달성 어워드 > 어워드 아이템
const DailyGoalAwardItem = ({
  awardImgSrc,
  awardName,
  awardGetDate,
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
}) => {
  const style = useStyle(STYLE_ID)

  const dateFormatted = `${awardGetDate.substring(0, 4)}. ${awardGetDate.substring(4, 6)}. ${awardGetDate.substring(6, 8)}`
  return (
    <div className={style.award_daily_goal_item}>
      <div className={style.row_a}>
        <div className={style.award_image}>
          <Image alt="" src={awardImgSrc} width={120} height={120} />
        </div>
        <div className={style.award_image_bg}></div>
      </div>
      <div className={style.row_b}>
        <div className={style.txt_l1}>{awardName}</div>
        <div className={style.txt_l2}>{dateFormatted}</div>
      </div>
    </div>
  )
}

// 연속 학습 달성 어워드
export function StreakAward() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const awardStudy = useAchieveSuccessiveStudy().payload

  const awardStudyList = useMemo(() => {
    type AwardStudy = {
      day: number
      achievedDate: string
      certificationUrl?: string
    }
    const study: AwardStudy[] = []
    awardStudy.forEach((item) => {
      /* 연속학습 인증서 oz리포트 미구현
      if (item.straightDayCount % 100 === 0) {
        study.push({
          ...item,
          day: item.straightDayCount,
          achievedDate: item.achievedDate,
          certificationUrl: 'http://ozreport.a1edu.com/streak',
        })
      }
      */
      const awardGetDate = item.achievedDate
      const dateFormatted = `${awardGetDate.substring(0, 4)}. ${awardGetDate.substring(4, 6)}. ${awardGetDate.substring(6, 8)}`

      study.push({
        day: item.straightDayCount,
        achievedDate: dateFormatted,
      })
    })

    return study
  }, [awardStudy])

  return (
    <div className={style.streak_award}>
      <AlertBar>{t('t087')}</AlertBar>
      {!awardStudy || awardStudy.length <= 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.streak_award_list}>
          {awardStudyList
            .filter((item) => item.day > 0 && item.day <= CONTINUOUS_MAX_DAY)
            .map((award, i) => {
              const image = award.certificationUrl
                ? '/src/images/@award-streak/certification.svg'
                : `/src/images/@award-streak/badge_${award.day}days.svg`
              const text = t('t088', { num: award.day })
              return (
                <div key={`award-streak-${i}`}>
                  {award.certificationUrl ? (
                    <StreakAwardItem
                      awardImgSrc={image}
                      awardName={text}
                      awardGetDate={award.achievedDate}
                      onClick={() => {}}
                    />
                  ) : (
                    <StreakAwardItem
                      awardImgSrc={image}
                      awardName={text}
                      awardGetDate={award.achievedDate}
                    />
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

// 연속 학습 달성 어워드 > 어워드 아이템
const StreakAwardItem = ({
  awardImgSrc,
  awardName,
  awardGetDate,
  onClick,
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      {onClick ? (
        <div className={style.streak_award_item} onClick={onClick}>
          <div className={style.row_a}>
            <div className={style.award_image}>
              <Image alt="" src={awardImgSrc} width={120} height={120} />
            </div>
            <div className={style.award_image_bg}></div>
          </div>
          <div className={style.row_b}>
            <div className={style.txt_l1}>{awardName}</div>
            <div className={style.txt_l2}>{awardGetDate}</div>
          </div>
        </div>
      ) : (
        <div className={style.streak_award_item}>
          <div className={style.row_a}>
            <div className={style.award_image}>
              <Image alt="" src={awardImgSrc} width={120} height={120} />
            </div>
            <div className={style.award_image_bg}></div>
          </div>
          <div className={style.row_b}>
            <div className={style.txt_l1}>{awardName}</div>
            <div className={style.txt_l2}>{awardGetDate}</div>
          </div>
        </div>
      )}
    </>
  )
}

// 챌린지(영어 독서왕 시상) 어워드
export function ChallengeAward() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const TROPHY_IMAGES = [
    '/src/images/@award-challenge/award_daesang.svg',
    '/src/images/@award-challenge/award_choiwoosu.svg',
    '/src/images/@award-challenge/award_woosu.svg',
    '/src/images/@award-challenge/award_sungsil.svg',
  ]

  const awardReadingKing = useAchieveReadingKingTrophy().payload

  return (
    <div className={style.challenge_award}>
      <AlertBar>{t('t089')}</AlertBar>
      {!awardReadingKing || awardReadingKing.length <= 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.challenge_award_list}>
          {awardReadingKing.map((award, idx) => {
            return (
              <div key={`award_readingking_${idx}`}>
                <ChallengeAwardItem
                  awardImgSrc={TROPHY_IMAGES[award.prizeGrade - 1]}
                  awardName={award.prizeTitle}
                  awardGetDate={award.registDate}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// 챌린지(영어 독서왕 시상) 어워드 > 어워드 아이템
const ChallengeAwardItem = ({
  awardImgSrc,
  awardName,
  awardGetDate,
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.challenge_award_item}>
      <div className={style.row_a}>
        <div className={style.award_image}>
          <Image alt="" src={awardImgSrc} width={120} height={120} />
        </div>
        <div className={style.award_image_bg}></div>
      </div>
      <div className={style.row_b}>
        <div className={style.txt_l1}>{awardName}</div>
        <div className={style.txt_l2}>{awardGetDate}</div>
      </div>
    </div>
  )
}

// 레벨마스터 어워드
export function LevelMasterAward() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const awardLevelMaster = useAchieveLevelMaster().payload
  return (
    <div className={style.level_master_award}>
      <AlertBar>{t('t090')}</AlertBar>
      {!awardLevelMaster || awardLevelMaster.length === 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.level_master_award_list}>
          {awardLevelMaster.map((award, i) => {
            const imageLevelName =
              award.masterLevelName === 'PK'
                ? 'prek'
                : award.masterLevelName.toLocaleLowerCase()
            const image = `/src/images/@award-level-master/level_${imageLevelName}.svg`
            return (
              <div key={i}>
                <LevelMasterAwardItem
                  awardImgSrc={image}
                  awardGetDate={award.levelDate}
                  awardLevel={award.masterLevelName}
                  awardCertification={award.certificationPath}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// 레벨마스터 어워드 > 아이템
export const LevelMasterAwardItem = ({
  awardImgSrc,
  awardGetDate,
  awardLevel,
  awardCertification = '',
}: {
  awardImgSrc: string
  awardGetDate: string
  awardLevel: string
  awardCertification?: string
}) => {
  const style = useStyle(STYLE_ID)

  let levelBgColor = 'level_' + awardLevel

  const onClickCertification = awardCertification
    ? () => {
        window?.open(awardCertification)
      }
    : undefined

  return (
    <div className={style.level_master_award_item}>
      <div className={style.row_a}>
        <div className={style.award_image}>
          <Image alt="" src={awardImgSrc} width={120} height={120} />
        </div>
        <div className={`${style.award_image_bg} ${levelBgColor}`}></div>
      </div>
      <div className={`${style.row_b} ${levelBgColor}`}>
        <div className={style.txt_l1} onClick={onClickCertification}>
          Certificate
        </div>
        <div className={style.txt_l2}>{awardGetDate}</div>
      </div>
    </div>
  )
}

// 일일 목표 설정
export function DailyGoalSetting() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const studyLearning = useStudentDailyLearning().payload
  const defaultSettingType =
    studyLearning.settingType === 'Books' ? 'book' : 'point'
  const defaultSettingValue =
    defaultSettingType === 'book' ? studyLearning.books : studyLearning.point

  const { loading: isChangeLoading, fetch: fetchChangeDailyLearning } =
    useFetchSetStudentDailyLearning()

  const [type, setType] = useState<'book' | 'point'>(defaultSettingType)
  const [settingValue, setSettingValue] = useState(defaultSettingValue || 1)

  const isSettingChanged = !(
    defaultSettingType === type && defaultSettingValue === settingValue
  )

  const { loading } = useOnLoadStudentDailyLearningHistory()
  const historyList = useStudentDailyLearning().history

  const onChangeSettingType = (type: 'point' | 'book') => {
    setType(type)
    if (type === 'point') {
      setSettingValue(studyLearning.point)
    } else {
      setSettingValue(studyLearning.books)
    }
  }

  const onUpdateSetting = () => {
    if (!isChangeLoading) {
      const level = studyLearning.settingLevelName
      const settingType = type === 'book' ? 'Books' : 'Points'
      fetchChangeDailyLearning(level, settingType, settingValue)
    }
  }

  const isDarkMode = useThemeMode() === 'dark'
  const plusIconPath = isDarkMode
    ? '/src/images/@daily-goal-setting/plus_white.svg'
    : '/src/images/@daily-goal-setting/plus.svg'
  const minusIconPath = isDarkMode
    ? '/src/images/@daily-goal-setting/minus_white.svg'
    : '/src/images/@daily-goal-setting/minus.svg'

  return (
    <div className={style.daily_goal_setting}>
      <div className={style.row_a}>
        <div className={style.txt_h}>{t('t091')}</div>
        <div className={style.row_a_container}>
          <div
            className={`${style.point} ${type === 'point' && style.active}`}
            onClick={() => {
              onChangeSettingType('point')
            }}>
            <div className={style.icon}>
              <Image
                alt=""
                src="/src/images/@daily-goal-setting/earn_point.svg"
                width={90}
                height={90}
              />
            </div>
            <div className={style.text_l}>{t('t092')}</div>
          </div>
          <div
            className={`${style.passed} ${type === 'book' && style.active}`}
            onClick={() => {
              onChangeSettingType('book')
            }}>
            <div className="icon">
              <Image
                alt=""
                src="/src/images/@daily-goal-setting/passed.svg"
                width={90}
                height={90}
              />
            </div>
            <div className={style.text_l}>{t('t093')}</div>
          </div>
        </div>
      </div>
      <div className={style.row_b}>
        <div className={style.txt_h}>{t('t094')}</div>
        <div className={style.row_b_container}>
          <div className={style.counter}>
            <div
              className={style.minus_button}
              onClick={() => {
                const newValue = settingValue - 1
                setSettingValue(Math.max(newValue, 1))
              }}>
              <Image alt="" src={minusIconPath} width={36} height={36} />
            </div>

            <div className={style.number}>
              {' '}
              {type === 'book'
                ? t('t095', { num: settingValue })
                : t('t096', { num: settingValue })}
            </div>
            <div
              className={style.plus_button}
              onClick={() => {
                const newValue = settingValue + 1
                setSettingValue(Math.min(newValue, 150))
              }}>
              <Image alt="" src={plusIconPath} width={36} height={36} />
            </div>
          </div>
          <div className={style.save_button}>
            {isSettingChanged ? (
              <Button
                shadow
                color={isChangeLoading ? 'gray' : 'blue'}
                width="100%"
                onClick={() => onUpdateSetting()}>
                {t('t097')}
              </Button>
            ) : (
              <Button color={'gray'} width="100%">
                <span className={style.txt_l}>{t('t098')}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={style.row_c}>
        <div className={style.txt_h}>{t('t099')}</div>
        <div className={style.row_c_container}>
          {!loading &&
            historyList.map((history, idx) => {
              return (
                <div key={`setting_history_${history.iDX}-${idx}`}>
                  <DailyGoalSetHistoryItem
                    date={history.settingDate}
                    type={history.settingType}
                    point={history.aimPoint}
                    book={history.settingBooks}
                  />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

// 일일 목표 설정 > 목표 설정 히스토리 아이템
const DailyGoalSetHistoryItem = ({
  date,
  type,
  point,
  book,
}: {
  date: string
  type: string
  point: number
  book: number
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.daily_goal_set_history_item}>
      <div className={style.set_date}>{date}</div>
      <div className={style.comment}>
        {type === 'Books' ? t('t093') : t('t092')}
      </div>
      <div className={style.set_goal}>
        {type === 'Books' ? t('t023', { num: book }) : `${point}P`}
      </div>
    </div>
  )
}

// 나의 학습 레벨
export function MyStudyLevel() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const [isStudyLevel, _isStudyLevel] = useState(true)
  const [isLevelTestHistory, _isLevelTestHistory] = useState(false)

  return (
    <div className={style.my_study_level}>
      <div className={style.row_a}>
        <Nav>
          <NavItem
            active={isStudyLevel}
            width="100%"
            onClick={() => {
              _isStudyLevel(true)
              _isLevelTestHistory(false)
            }}>
            {t('t101')}
          </NavItem>
          <NavItem
            active={isLevelTestHistory}
            width="100%"
            onClick={() => {
              _isStudyLevel(false)
              _isLevelTestHistory(true)
            }}>
            {t('t102')}
          </NavItem>
        </Nav>
      </div>
      <div className={style.row_b}>
        {isStudyLevel && <CurrentStudyLevel />}
        {isLevelTestHistory && <LevelTestHistory />}
      </div>
    </div>
  )
}

// 나의 학습 레벨 > 진행중인 전체 학습 레벨
const CurrentStudyLevel = () => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const { loading: isLevelMasterLoading } = useOnLoadAchieveLevelMaster()
  const { loading: isLevelChangeLoading, fetch: fetchLevelChange } =
    useFetchSetStudentDailyLearningLevel()

  const levelPoints = useAchieveLevelPoint().payload
  const levelMaster = useAchieveLevelMaster().payload
  const defaultLevel = useSelectStudyLevel()

  const levelList = useMemo(() => {
    const levelList = levelPoints.map((p) => {
      return {
        level: p.levelName,
        progress: Math.min(
          100,
          Math.floor((p.myRgPoint / p.requiredRgPoint) * 100),
        ),
        isMaster: false,
      }
    })
    levelMaster.forEach((lm) => {
      levelList.forEach((ll) => {
        if (lm.masterLevelName === ll.level) {
          ll.isMaster = true
        }
      })
    })
    return levelList
  }, [levelMaster, levelPoints])

  const [level, setLevel] = useState(defaultLevel)

  const onLevelChange = () => {
    if (!isLevelChangeLoading) {
      fetchLevelChange(level)
    }
  }
  return (
    <>
      <div className={style.current_study_level}>
        <div>
          <div className={style.txt_h}>{t('t103')}</div>
          <div className={style.txt_p}>{t('t104')}</div>
          <SelectBox
            value={level}
            onChange={(e) => {
              const level = e.target.value
              setLevel(level)
            }}>
            <SelectBoxItem value="PK">{t('t105')}</SelectBoxItem>
            <SelectBoxItem value="KA">{t('t106')}</SelectBoxItem>
            <SelectBoxItem value="KB">{t('t107')}</SelectBoxItem>
            <SelectBoxItem value="KC">{t('t108')}</SelectBoxItem>
            <SelectBoxItem value="1A">{t('t109')}</SelectBoxItem>
            <SelectBoxItem value="1B">{t('t110')}</SelectBoxItem>
            <SelectBoxItem value="1C">{t('t111')}</SelectBoxItem>
            <SelectBoxItem value="2A">{t('t112')}</SelectBoxItem>
            <SelectBoxItem value="2B">{t('t113')}</SelectBoxItem>
            <SelectBoxItem value="2C">{t('t114')}</SelectBoxItem>
            <SelectBoxItem value="3A">{t('t115')}</SelectBoxItem>
            <SelectBoxItem value="3B">{t('t116')}</SelectBoxItem>
            <SelectBoxItem value="3C">{t('t117')}</SelectBoxItem>
            <SelectBoxItem value="4A">{t('t118')}</SelectBoxItem>
            <SelectBoxItem value="4B">{t('t119')}</SelectBoxItem>
            <SelectBoxItem value="4C">{t('t120')}</SelectBoxItem>
            <SelectBoxItem value="5A">{t('t121')}</SelectBoxItem>
            <SelectBoxItem value="5B">{t('t122')}</SelectBoxItem>
            <SelectBoxItem value="5C">{t('t123')}</SelectBoxItem>
            <SelectBoxItem value="6A">{t('t124')}</SelectBoxItem>
            <SelectBoxItem value="6B">{t('t125')}</SelectBoxItem>
            <SelectBoxItem value="6C">{t('t126')}</SelectBoxItem>
          </SelectBox>
        </div>
        {/*         
        <div>
          <div className={style.txt_h}>전체 레벨</div>
          <div className={style.txt_p}>
            전체 레벨과 레벨업 진행 상태를 확인할 수 있어요. 레벨업을 완료하면
            레벨 마스터 배지가 표시됩니다.
          </div>
        </div>
        <div className={style.current_study_level_container}>
          {levelList.map((lv, i) => {
            return (
              <div key={`LevelStudyStatus_${lv.level}`}>
                <LeveledStudyStatusItem
                  level={lv.level}
                  progress={lv.progress}
                  isLevelMaster={lv.isMaster}
                  isStudentLevel={level === lv.level}
                />
              </div>
            )
          })}
        </div> */}
      </div>
      {/* 레벨을 셀렉트 박스에서 변경했을 때 활성화 됨 */}
      {level !== defaultLevel && (
        <div className={style.change_current_study_level}>
          <div className={style.txt_p}>{t('t129')}</div>
          <div className={style.confirm}>
            <div
              className={style.button}
              onClick={() => {
                onLevelChange()
              }}>
              {t('t130')}
            </div>
            <div
              className={style.button}
              onClick={() => setLevel(defaultLevel)}>
              {t('t131')}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// 나의 학습 레벨 > 진행중인 전체 학습 레벨 > 레벨별 학습상태 아이템
const LeveledStudyStatusItem = ({
  isLevelMaster,
  isStudentLevel,
  level,
  progress,
}: {
  isLevelMaster: boolean
  isStudentLevel: boolean
  level: string
  progress: number
}) => {
  const style = useStyle(STYLE_ID)

  const graphIndex = Math.ceil(progress / 10) * 10

  const levelMasterImage = `/src/images/@my-study-level/level_${level.toLowerCase() === 'pk' ? 'prek' : level.toLowerCase()}.svg`

  return (
    <div className={style.leveled_study_status_item}>
      {isLevelMaster ? (
        <div
          className={style.level_master_image}
          style={{
            backgroundImage: `url("${levelMasterImage}")`,
          }}></div>
      ) : (
        <div
          className={`${style.level_name} ${
            isStudentLevel && style.student_level
          }`}
          style={{
            backgroundImage: `url("/src/images/@my-study-level/leveled_study_progres_${graphIndex}.svg")`,
          }}>
          {level}
        </div>
      )}
      <div className={style.leveled_study_status}>
        <b>{progress}</b> / 100%
      </div>
    </div>
  )
}

// 나의 학습 레벨 > 레벨 테스트 이력
const LevelTestHistory = () => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const { loading: isTestHistoryLoading } = useOnLoadAchieveLevelTest()
  const { loading: isLevelTestInfoLoading } = useOnLoadLevelTestInfo()

  const history = useAchieveLevelTest().payload
  const levelTestInfo = useLevelTestInfo().payload
  const reportUrl = levelTestInfo.report

  const isEmpty = history.length === 0

  const onStartLevelTest = () => {
    goToLevelTest()
  }

  return (
    <>
      <div className={style.level_test_history}>
        <div>
          <div className={style.txt_h}>{t('t132')}</div>
          <div className={style.txt_p}>{t('t133')}</div>
        </div>
        {/* 레벨 테스트 이력이 없을 때 */}
        {!isTestHistoryLoading && isEmpty && (
          <EmptyMessage>{t('t134')}</EmptyMessage>
        )}
        {!isTestHistoryLoading &&
          history.map((h, i) => {
            const click =
              reportUrl && i === 0
                ? () => {
                    window?.open(reportUrl)
                  }
                : undefined
            return (
              <LevelTestHistoryItem
                key={`LtHistory-${h.levelName}-${i}`}
                testResultLevel={h.levelName}
                testDate={h.levelDate}
                onClick={click}
              />
            )
          })}
      </div>
      {/* 레벨 테스트가 가능인 상태일 때 활성화 됨 */}
      {!isLevelTestInfoLoading && levelTestInfo.isAvailableLevelTest && (
        <div className={style.level_test_ready}>
          <div className={style.txt_p}>{t('t135')}</div>
          <Button shadow onClick={onStartLevelTest}>
            {t('t136')}
          </Button>
        </div>
      )}
    </>
  )
}

// 나의 학습 레벨 > 레벨 테스트 이력 > 레벨 테스트 결과 아이템
const LevelTestHistoryItem = ({
  testResultLevel,
  testDate,
  onClick,
}: {
  testResultLevel: string
  testDate: string
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.level_test_history_item}>
      <div className={style.col_a}>
        {/* <div className={style.level_symbol_box}>{testResultLevel}</div> */}
        <div className={style.test_result_info}>
          <div className={style.txt_l}>{testDate}</div>
          <div className={style.txt_p2}>
            {t('t137')} <b>{testResultLevel}</b>
          </div>
        </div>
      </div>
      {onClick && (
        <div className={style.col_b} onClick={onClick}>
          Report
        </div>
      )}
    </div>
  )
}

// // 학습 설정
// export function SetStudyMode() {
//   const [isLevelUpMode, _isLevelUpMode] = useState(true)
//   const [isChallengeMode, _isChallengeMode] = useState(false)

//   return (
//     <div className={style.set_study_mode}>
//       <div className={style.row_a}>
//         <div className={style.txt_h}>화면 모드</div>
//         {/* 자유 모드, 코스 모드 */}
//         <div className={style.choose_study_mode}>
//           <ChooseStudyModeItem
//             name="레벨업 모드"
//             active={isLevelUpMode}
//             levelUpIcon
//             onClick={() => {
//               _isLevelUpMode(true)
//               _isChallengeMode(false)
//             }}
//           />
//           <ChooseStudyModeItem
//             name="챌린지 모드"
//             active={isChallengeMode}
//             challengeIcon
//             onClick={() => {
//               _isLevelUpMode(false)
//               _isChallengeMode(true)
//             }}
//           />
//         </div>
//       </div>
//       <div className={style.row_c}>
//         <div className={style.txt_h}>eBook 읽기</div>
//         <SetStudyOptionItem
//           title="Listen & Repeat - Level K"
//           discription="eBook KA ~ KC 레벨의 읽기 단계에서 전체 내용을 2회 반복 청취하는 액티비티을 제공합니다."
//           check={false}
//         />
//         <SetStudyOptionItem
//           title="Listen & Repeat - Level 1"
//           discription="eBook 1A ~ 1C 레벨의 읽기 단계에서 전체 내용을 2회 반복 청취하는 액티비티을 제공합니다."
//           check={false}
//         />
//       </div>
//       <div className={style.row_b}>
//         <div className={style.txt_h}>퀴즈 설정 (Level 2 이상)</div>
//         <SetStudyOptionItem
//           title="Vocabulary Hint / Skip"
//           discription="Vocabulary 퀴즈를 풀다가 막혔을 때 힌트를 보거나 다음 문제로 건너뛸 수
//         있습니다."
//           check={true}
//         />
//         <SetStudyOptionItem
//           title="Summary Chance"
//           discription="Summary 퀴즈를 풀다가 막혔을 때 찬스를 써서 다음 문제로 건너뛸 수 있습니다."
//           check={true}
//         />
//       </div>
//       <Button shadow width={'100%'}>
//         저장하기
//       </Button>
//     </div>
//   )
// }
