'use client'

// @Deprecate('Not Used')
import './global-option-level-bg-color.scss'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import {
  AlertBar,
  Button,
  CheckBox,
  EmptyMessage,
  Modal,
  Nav,
  NavItem,
  SelectBox,
  SelectBoxItem,
  TextField,
} from '../common-components'

const STYLE_ID = 'global_my_rg'

// My RG 모달
export function MyRgModal({
  _viewMyRgModal,
}: {
  _viewMyRgModal?: (isView: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

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
    ? '나의 RG'
    : isMyProfile
      ? '프로필'
      : isEditProfile
        ? '프로필 수정'
        : isChooseAvatar
          ? '아바타 선택'
          : isDailyGoalAward
            ? '일일목표 어워드'
            : isStreakAward
              ? '연속 학습 어워드'
              : isChallengeAward
                ? '챌린지 어워드 (영어독서왕 시상)'
                : isLevelMasterAward
                  ? '레벨 마스터'
                  : isDailyGoalSetting
                    ? '일일목표 설정'
                    : isMyStudyLevel
                      ? '나의 학습 레벨'
                      : isSetStudyMode
                        ? '학습설정'
                        : undefined

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
        }
        if (isChooseAvatar) {
          _isEditProfile(true)
          _isChooseAvatar(false)
        }
        if (isDailyGoalAward) {
          _isMyProfile(true)
          _isDailyGoalAward(false)
        }
        if (isStreakAward) {
          _isMyProfile(true)
          _isStreakAward(false)
        }
        if (isChallengeAward) {
          _isMyProfile(true)
          _isChallengeAward(false)
        }
        if (isLevelMasterAward) {
          _isMyProfile(true)
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
            onClickMyRgUserCard={() => {
              _isMyRg(false)
              _isMyProfile(true)
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
            onClickAccountInfo={() => {
              location.href = '/account/account-info'
              setTimeout(() => {
                _isMyRg(false)
              }, 300)
            }}
            onClickSetStudyMode={() => {
              _isMyRg(false)
              _isSetStudyMode(true)
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
            onClickChangeAvatar={() => {
              _isEditProfile(false)
              _isChooseAvatar(true)
            }}
          />
        )}
        {isChooseAvatar && <ChooseAvatar />}
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
  onClickMyRgUserCard,
  _isMyRg,
  _isMyProfile,
  onClickTodo,
  onClickFavorite,
  onClickDailyGoalSetting,
  onClickMyStudyLevel,
  onClickAccountInfo,
  onClickSetStudyMode,
}: {
  onClickMyRgUserCard?: () => void
  _isMyRg?: () => void
  _isMyProfile?: () => void
  onClickTodo?: () => void
  onClickFavorite?: () => void
  onClickDailyGoalSetting?: () => void
  onClickMyStudyLevel?: () => void
  onClickAccountInfo?: () => void
  onClickSetStudyMode?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_rg}>
      <MyRgUseEndDate useEndDate={180} />
      <MyRgUserCard onClick={onClickMyRgUserCard} />
      <MyRgAssignmentInfo
        onClickTodo={onClickTodo}
        onClickFavorite={onClickFavorite}
        todoAssignNum={10}
        favoriteAssignNum={10}
      />
      <MyRgGoalInfo
        onClickDailyGoalSetting={onClickDailyGoalSetting}
        onClickMyStudyLevel={onClickMyStudyLevel}
      />
      <MyRgEtc
        onClickSetStudyMode={onClickSetStudyMode}
        onClickAccountInfo={onClickAccountInfo}
      />
      <div className={style.log_out}>
        <Button color="dark">로그아웃</Button>
      </div>
    </div>
  )
}

// My RG > 남은기간
const MyRgUseEndDate = ({ useEndDate }: { useEndDate: number }) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_rg_use_end_date}>
      <span>남은 학습 기간</span>
      <span>
        <b>{useEndDate}일</b>
      </span>
    </div>
  )
}

// My RG > 사용자정보
const MyRgUserCard = ({ onClick }: { onClick?: () => void }) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_rg_user_card} onClick={onClick}>
      <div className={style.user_info}>
        <div className={style.user_avatar}>
          <Image
            alt=""
            src="https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_03.png"
            width={100}
            height={100}
          />
        </div>
        <div>
          <div className={style.user_grade}>초등 3학년</div>
          <div className={style.user_name}>윤서연</div>
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
        <Link href="/library/find/assignment/to-do" onClick={onClickTodo}>
          <div className={style.to_do}>
            <div className={style.txt_l}>To-Do</div>
            <div className={style.count_num}>{todoAssignNum}</div>
          </div>
        </Link>
        <Link
          href="/library/find/assignment/favorite"
          onClick={onClickFavorite}>
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
  onClickDailyGoalSetting,
  onClickMyStudyLevel,
}: {
  onClickDailyGoalSetting?: () => void
  onClickMyStudyLevel?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_rg_goal_info}>
      <div className={style.col_a} onClick={onClickDailyGoalSetting}>
        <div className={style.txt_l}>일일목표</div>
        <div className={style.contents}>0/5권 학습하기</div>
      </div>
      <div className={style.col_b} onClick={onClickMyStudyLevel}>
        <div className={style.txt_l}>나의 학습 레벨</div>
        <div className={style.contents}>KA</div>
      </div>
    </div>
  )
}

// My RG > 기타
const MyRgEtc = ({
  onClickSetStudyMode,
  onClickAccountInfo,
}: {
  onClickSetStudyMode?: () => void
  onClickAccountInfo?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_rg_etc}>
      <div className={style.etc_item} onClick={onClickAccountInfo}>
        <Image
          alt=""
          src="/src/images/@my-rg-modal/user_info.svg"
          width={50}
          height={50}
        />
        <div className={style.txt_l}>계정 정보</div>
      </div>
      <div className={style.etc_item} onClick={onClickSetStudyMode}>
        <Image
          alt=""
          src="/src/images/@my-rg-modal/set_study.svg"
          width={50}
          height={50}
        />
        <div className={style.txt_l}>학습설정</div>
      </div>
      <div className={style.etc_item}>
        <Image
          alt=""
          src=" /src/images/@my-rg-modal/chatbot.svg"
          width={50}
          height={50}
        />
        <div className={style.txt_l}>1:1 챗봇상담</div>
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

  return (
    <div className={style.my_profile}>
      <TotalStudyScore
        userGrade={'초등3학년'}
        studentName={'윤서현'}
        totalPassed={1000}
        totalEarnPoints={2000.22}
        onClick={onClickEditProfile}
      />
      <AwardListContainer>
        <AwardListItem
          tag="목표달성"
          text={'일일목표 어워드'}
          collectNum={10}
          onClick={onClickDailyGoalAward}
        />
        <AwardListItem
          tag="목표달성"
          text={'연속학습 어워드'}
          collectNum={10}
          onClick={onClickStreakAward}
        />
        <AwardListItem
          tag="챌린지"
          text={'영어독서왕 시상'}
          collectNum={10}
          onClick={onClickChallengeAward}
        />
        <AwardListItem
          tag="퀘스트"
          text={'레벨 마스터'}
          collectNum={10}
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
  userAvatar?: string
  totalPassed: number
  totalEarnPoints: number
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.total_study_score}>
      <div className={style.student_info}>
        <div className={style.user_grade}>{userGrade}</div>
        <div className={style.student_name}>
          <div className={style.txt_l}>{studentName}</div>
          <div className={style.edit_button} onClick={onClick}>
            <Image
              alt=""
              src={'/src/images/pencil-icons/pencil_white_2.svg'}
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className={style.user_avatar}>
          <Image
            alt=""
            src="https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_03.png"
            width={150}
            height={150}
          />
        </div>
      </div>
      <div className={style.total_score_container}>
        <div className={style.col_a}>
          <div className={style.txt_l}>총 학습 권 수</div>
          <div className={style.txt_d}>{totalPassed}권</div>
        </div>
        <div className={style.col_b}>
          <div className={style.txt_l}>총 획득 포인트</div>
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

  return (
    <div className={style.award_list_item} onClick={onClick}>
      <div className={style.col_a}>
        <span className={style.txt_l}>{tag}</span>
        <span className={style.txt_p}>
          {text} {collectNum}개
        </span>
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

// 프로필 수정
export function EditProfile({
  onClickChangeAvatar,
}: {
  onClickChangeAvatar?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.edit_profile}>
      <div className={style.user_avatar}>
        <div className={style.user_avatar_image}>
          <Image
            alt=""
            src="https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_03.png"
            width={150}
            height={150}
          />
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
      <TextField id={'edit-student-name'} hint={'학생이름'} />
      <SelectBox id={'select-student-grade'} hint={'학년'}>
        <SelectBoxItem value={'age0'}>미정</SelectBoxItem>
        <SelectBoxItem value={'age5'}>5세</SelectBoxItem>
        <SelectBoxItem value={'age6'}>6세</SelectBoxItem>
        <SelectBoxItem value={'age7'}>7세</SelectBoxItem>
        <SelectBoxItem value={'ag8'}>초등 1학년</SelectBoxItem>
        <SelectBoxItem value={'age9'}>초등 2학년</SelectBoxItem>
        <SelectBoxItem value={'age10'}>초등 3학년</SelectBoxItem>
        <SelectBoxItem value={'age11'}>초등 4학년</SelectBoxItem>
        <SelectBoxItem value={'age12'}>초등 5학년</SelectBoxItem>
        <SelectBoxItem value={'age13'}>초등 6학년</SelectBoxItem>
        <SelectBoxItem value={'age14'}>청소년 이상</SelectBoxItem>
      </SelectBox>
      <Button shadow>수정 완료</Button>
    </div>
  )
}

// 아바타 수정
export function ChooseAvatar() {
  const style = useStyle(STYLE_ID)

  const imageUrl =
    'https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/'

  const avatarInfo = [
    { avtName: 'DODO', avtImgSrc: 'dodo_03.png', selected: true },
    { avtName: 'KOON', avtImgSrc: 'koon_03.png', selected: false },
    { avtName: 'JUJU', avtImgSrc: 'juju_03.png', selected: false },
    { avtName: 'MOMO', avtImgSrc: 'momo_03.png', selected: false },
    { avtName: 'BORI', avtImgSrc: 'bori_03.png', selected: false },
    { avtName: 'PANG', avtImgSrc: 'pang_03.png', selected: false },
    { avtName: 'DORI', avtImgSrc: 'dori_01.png', selected: false },
    { avtName: 'POPPY', avtImgSrc: 'poopy_01.png', selected: false },
    { avtName: 'ROBO', avtImgSrc: 'robo_cleaner_01.png', selected: false },
    { avtName: 'ERIKA', avtImgSrc: 'erika_01.png', selected: false },
    { avtName: 'ELLA', avtImgSrc: 'ella_01.png', selected: false },
    { avtName: 'POIKA', avtImgSrc: 'poika_01.png', selected: false },
  ]

  return (
    <div className={style.choose_avatar}>
      <div className={style.choose_avatar_container}>
        {avatarInfo.map((a, i) => {
          return (
            <div key={i}>
              <AvatarItem
                avtImgSrc={imageUrl + a.avtImgSrc}
                avtName={a.avtName}
                selected={a.selected}
              />
            </div>
          )
        })}
      </div>
      <Button shadow>선택 완료</Button>
    </div>
  )
}

// 아바타 수정 > 아바타 아이템
const AvatarItem = ({
  selected,
  check,
  avtImgSrc,
  avtName,
}: {
  selected: boolean
  check?: boolean
  avtImgSrc: string
  avtName: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.avatar_item}>
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

  const dailyGoalAwardData = [
    {
      round: 6,
      text: '일일목표 150회 달성',
      date: '2023.10.10',
      image: '/src/images/@award-daily-goal/badge_150d.svg',
    },
    {
      round: 5,
      text: '일일목표 125회 달성',
      date: '2023.9.10',
      image: '/src/images/@award-daily-goal/badge_125d.svg',
    },
    {
      round: 4,
      text: '일일목표 100회 달성',
      date: '2023.8.10',
      image: '/src/images/@award-daily-goal/badge_100d.svg',
    },
    {
      round: 3,
      text: '일일목표 75회 달성',
      date: '2023.7.10',
      image: '/src/images/@award-daily-goal/badge_75d.svg',
    },
    {
      round: 2,
      text: '일일목표 50회 달성',
      date: '2023.6.10',
      image: '/src/images/@award-daily-goal/badge_50d.svg',
    },
    {
      round: 1,
      text: '일일목표 25회 달성',
      date: '2023.5.10',
      image: '/src/images/@award-daily-goal/badge_25d.svg',
    },
  ]

  let emptyMessage = false // 받은 어워드가 있는지 여부

  return (
    <div className={style.daily_goal_award}>
      <AlertBar>
        일일목표를 완료하여 25일 마다 새로운 어워드를 획득해 보세요.
      </AlertBar>
      {emptyMessage ? (
        <EmptyMessage isAward>아직 받은 어워드가 없어요.</EmptyMessage>
      ) : (
        <div className={style.daily_goal_award_list}>
          {dailyGoalAwardData.map((a, i) => {
            return (
              <div key={i}>
                <DailyGoalAwardItem
                  awardImgSrc={a.image}
                  awardName={a.text}
                  awardGetDate={a.date}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// 일일 목표 달성 어워드 > 어워드 아이템
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
        <div className={style.txt_l2}>{awardGetDate}</div>
      </div>
    </div>
  )
}

// 연속 학습 달성 어워드
export function StreakAward() {
  const style = useStyle(STYLE_ID)

  const streakAwardData = [
    {
      round: 6,
      text: 'Certifycate',
      date: '2023.10.10',
      image: '/src/images/@award-streak/certification.svg',
    },
    {
      round: 5,
      text: '연속 학습 100일 달성',
      date: '2023.9.10',
      image: '/src/images/@award-streak/badge_100days.svg',
    },
    {
      round: 4,
      text: '연속 학습 80일 달성',
      date: '2023.8.10',
      image: '/src/images/@award-streak/badge_80days.svg',
    },
    {
      round: 3,
      text: '연속 학습 60일 달성',
      date: '2023.7.10',
      image: '/src/images/@award-streak/badge_60days.svg',
    },
    {
      round: 2,
      text: '연속 학습 40일 달성',
      date: '2023.6.10',
      image: '/src/images/@award-streak/badge_40days.svg',
    },
    {
      round: 1,
      text: '연속 학습 20일 달성',
      date: '2023.5.10',
      image: '/src/images/@award-streak/badge_20days.svg',
    },
  ]

  let emptyMessage = false // 받은 어워드가 있는지 여부

  return (
    <div className={style.streak_award}>
      <AlertBar>
        연속 학습을 완료하여 20일 마다 새로운 어워드를 획득해 보세요.
      </AlertBar>
      {emptyMessage ? (
        <EmptyMessage isAward>아직 받은 어워드가 없어요.</EmptyMessage>
      ) : (
        <div className={style.streak_award_list}>
          {streakAwardData.map((a, i) => {
            return (
              <div key={i}>
                <StreakAwardItem
                  awardImgSrc={a.image}
                  awardName={a.text}
                  awardGetDate={a.date}
                />
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
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
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
  )
}

// 챌린지(영어 독서왕 시상) 어워드
export function ChallengeAward() {
  const style = useStyle(STYLE_ID)

  const challengeAwardData = [
    {
      round: 4,
      text: '2022 상반기 대상 수상',
      date: '2023.8.10',
      image: '/src/images/@award-challenge/award_daesang.svg',
    },
    {
      round: 3,
      text: '2021 하반기 최우수상 수상',
      date: '2023.7.10',
      image: '/src/images/@award-challenge/award_choiwoosu.svg',
    },
    {
      round: 2,
      text: '2019 하반기 우수상 수상',
      date: '2023.6.10',
      image: '/src/images/@award-challenge/award_woosu.svg',
    },
    {
      round: 1,
      text: '2018 상반기 성실상 수상',
      date: '2023.5.10',
      image: '/src/images/@award-challenge/award_sungsil.svg',
    },
  ]

  let emptyMessage = false // 받은 어워드가 있는지 여부

  return (
    <div className={style.challenge_award}>
      <AlertBar>영어 독서왕 챌린지에 도전하여 상품을 획득해 보세요.</AlertBar>
      {emptyMessage ? (
        <EmptyMessage isAward>아직 받은 어워드가 없어요.</EmptyMessage>
      ) : (
        <div className={style.challenge_award_list}>
          {challengeAwardData.map((a, i) => {
            return (
              <div key={i}>
                <ChallengeAwardItem
                  awardImgSrc={a.image}
                  awardName={a.text}
                  awardGetDate={a.date}
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

  const levelMasterAwardData = [
    {
      round: 4,
      date: '2023.8.10',
      level: '1A',
      image: '/src/images/@award-level-master/level_1a.svg',
    },
    {
      round: 3,
      date: '2023.7.10',
      level: 'KC',
      image: '/src/images/@award-level-master/level_kc.svg',
    },
    {
      round: 2,
      date: '2023.6.10',
      level: 'KB',
      image: '/src/images/@award-level-master/level_kb.svg',
    },
    {
      round: 1,
      date: '2023.5.10',
      level: 'KA',
      image: '/src/images/@award-level-master/level_ka.svg',
    },
  ]

  let emptyMessage = false // 받은 어워드가 있는지 여부

  return (
    <div className={style.level_master_award}>
      <AlertBar>
        레벨별 학습 포인트를 모아서 레벨 마스터 어워드를 획득하세요.
      </AlertBar>
      {emptyMessage ? (
        <EmptyMessage isAward>아직 받은 어워드가 없어요.</EmptyMessage>
      ) : (
        <div className={style.level_master_award_list}>
          {levelMasterAwardData.map((a, i) => {
            return (
              <div key={i}>
                <LevelMasterAwardItem
                  awardImgSrc={a.image}
                  awardGetDate={a.date}
                  awardLevel={a.level}
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
}: {
  awardImgSrc: string
  awardGetDate: string
  awardLevel: string
}) => {
  const style = useStyle(STYLE_ID)

  let levelBgColor = 'level_' + awardLevel

  return (
    <div className={style.level_master_award_item}>
      <div className={style.row_a}>
        <div className={style.award_image}>
          <Image alt="" src={awardImgSrc} width={120} height={120} />
        </div>
        <div className={`${style.award_image_bg} ${levelBgColor}`}></div>
      </div>
      <div className={`${style.row_b} ${levelBgColor}`}>
        <div className={style.txt_l1}>Certificate</div>
        <div className={style.txt_l2}>{awardGetDate}</div>
      </div>
    </div>
  )
}

// 일일 목표 설정
export function DailyGoalSetting() {
  const style = useStyle(STYLE_ID)

  const dailyGoalSetHistory = [
    {
      date: '2023.10.12',
      text: '포인트 획득하기',
      goalType: 'earn points',
      goal: '150P',
    },
    {
      date: '2023.10.10',
      text: '학습 완료하기',
      goalType: 'passed',
      goal: '5권',
    },
  ]

  const [isGoalTypePoint, _isGoalTypePoint] = useState(false)
  const [isGoalTypePassed, _isGoalTypePassed] = useState(true)

  return (
    <div className={style.daily_goal_setting}>
      <div className={style.row_a}>
        <div className={style.txt_h}>나의 목표 달성 방법은?</div>
        <div className={style.row_a_container}>
          <div
            className={`${style.point} ${isGoalTypePoint && style.active}`}
            onClick={() => {
              _isGoalTypePoint(true)
              _isGoalTypePassed(false)
            }}>
            <div className={style.icon}>
              <Image
                alt=""
                src="/src/images/@daily-goal-setting/earn_point.svg"
                width={90}
                height={90}
              />
            </div>
            <div className={style.text_l}>포인트 획득하기</div>
          </div>
          <div
            className={`${style.passed} ${isGoalTypePassed && style.active}`}
            onClick={() => {
              _isGoalTypePoint(false)
              _isGoalTypePassed(true)
            }}>
            <div className="icon">
              <Image
                alt=""
                src="/src/images/@daily-goal-setting/passed.svg"
                width={90}
                height={90}
              />
            </div>
            <div className={style.text_l}>학습 완료하기</div>
          </div>
        </div>
      </div>
      <div className={style.row_b}>
        <div className={style.txt_h}>목표 설정</div>
        <div className={style.row_b_container}>
          <div className={style.counter}>
            <div className={style.minus_button}>
              <Image
                alt=""
                src="/src/images/@daily-goal-setting/minus.svg"
                width={36}
                height={36}
              />
            </div>
            <div className={style.number}>매일 1권씩 학습</div>
            <div className={style.plus_button}>
              <Image
                alt=""
                src="/src/images/@daily-goal-setting/plus.svg"
                width={36}
                height={36}
              />
            </div>
          </div>
          <div className={style.save_button}>
            <Button color={'gray'} width="100%">
              <span className={style.txt_l}>설정</span>
            </Button>
            {/* 카운터의 숫자를 수정하면 버튼이 아래와 같이 파란색으로 활성화 됨 */}
            {/* <Button shadow color={"blue"} width="100%">
              설정변경
            </Button> */}
          </div>
        </div>
      </div>
      <div className={style.row_c}>
        <div className={style.txt_h}>목표 변경 이력</div>
        <div className={style.row_c_container}>
          {dailyGoalSetHistory.map((a, i) => {
            return (
              <div key={i}>
                <DailyGoalSetHistoryItem
                  date={a.date}
                  comment={a.text}
                  goal={a.goal}
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
  comment,
  goal,
}: {
  date: string
  comment: string
  goal: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.daily_goal_set_history_item}>
      <div className={style.set_date}>{date}</div>
      <div className={style.comment}>{comment}</div>
      <div className={style.set_goal}>{goal}</div>
    </div>
  )
}

// 나의 학습 레벨
export function MyStudyLevel() {
  const style = useStyle(STYLE_ID)

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
            현재 상태
          </NavItem>
          <NavItem
            active={isLevelTestHistory}
            width="100%"
            onClick={() => {
              _isStudyLevel(false)
              _isLevelTestHistory(true)
            }}>
            레벨 테스트
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

  const leveledStudyStatusData = [
    {
      level: 'KA',
      status: '100',
      total: '100',
      master: 'Y',
      masterImage: '/src/images/@my-study-level/level_ka.svg',
    },
    {
      level: 'KB',
      status: '90',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_kb.svg',
    },
    {
      level: 'KC',
      status: '91',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_kc.svg',
    },
    {
      level: '1A',
      status: '92',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_1a.svg',
    },
    {
      level: '1B',
      status: '93',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_1b.svg',
    },
    {
      level: '1C',
      status: '94',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_1c.svg',
    },
    {
      level: '2A',
      status: '95',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_2a.svg',
    },
    {
      level: '2B',
      status: '96',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_2b.svg',
    },
    {
      level: '2C',
      status: '97',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_2c.svg',
    },
    {
      level: '3A',
      status: '98',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_3a.svg',
    },
    {
      level: '3B',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_3b.svg',
    },
    {
      level: '3C',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_3c.svg',
    },
    {
      level: '4A',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_4a.svg',
    },
    {
      level: '4B',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_4b.svg',
    },
    {
      level: '4C',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_4c.svg',
    },
    {
      level: '5A',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_5a.svg',
    },
    {
      level: '5B',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_5b.svg',
    },
    {
      level: '5C',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_5c.svg',
    },
    {
      level: '6A',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_6a.svg',
    },
    {
      level: '6B',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_6b.svg',
    },
    {
      level: '6C',
      status: '99',
      total: '100',
      master: 'N',
      masterImage: '/src/images/@my-study-level/level_6c.svg',
    },
  ]

  return (
    <>
      <div className={style.current_study_level}>
        <div>
          <div className={style.txt_h}>학습 중인 레벨</div>
          <div className={style.txt_p}>
            현재 학습 중인 레벨이 표시됩니다. 아래 메뉴를 탭 해서 학습 레벨을
            변경할 수도 있어요.
          </div>
          <SelectBox>
            <SelectBoxItem>PreK (유치원 수준)</SelectBoxItem>
            <SelectBoxItem>KA (초등 저학년 A단계)</SelectBoxItem>
            <SelectBoxItem>KB (초등 저학년 B단계)</SelectBoxItem>
            <SelectBoxItem>KC (초등 저학년 C단계)</SelectBoxItem>
            <SelectBoxItem>1A (초등 고학년 A단계)</SelectBoxItem>
            <SelectBoxItem>1B (초등 고학년 B단계)</SelectBoxItem>
            <SelectBoxItem>1C (초등 고학년 C단계)</SelectBoxItem>
            <SelectBoxItem>2A (중등 수준)</SelectBoxItem>
            <SelectBoxItem>2B (중등 수준)</SelectBoxItem>
            <SelectBoxItem>2C (중등 수준)</SelectBoxItem>
            <SelectBoxItem>3A (중등 수준)</SelectBoxItem>
            <SelectBoxItem>3B (중등 수준)</SelectBoxItem>
            <SelectBoxItem>3C (중등 수준)</SelectBoxItem>
            <SelectBoxItem>4A (고등 수준)</SelectBoxItem>
            <SelectBoxItem>4B (고등 수준)</SelectBoxItem>
            <SelectBoxItem>4C (고등 수준)</SelectBoxItem>
            <SelectBoxItem>5A (고등 수준)</SelectBoxItem>
            <SelectBoxItem>5B (고등 수준)</SelectBoxItem>
            <SelectBoxItem>5C (고등 수준)</SelectBoxItem>
            <SelectBoxItem>6A (고등 수준)</SelectBoxItem>
            <SelectBoxItem>6B (고등 수준)</SelectBoxItem>
            <SelectBoxItem>6C (고등 수준)</SelectBoxItem>
          </SelectBox>
        </div>
        <div>
          <div className={style.txt_h}>전체 레벨</div>
          <div className={style.txt_p}>
            전체 레벨과 레벨업 진행 상태를 확인할 수 있어요. 레벨업을 완료하면
            레벨 마스터 배지가 표시됩니다.
          </div>
        </div>
        <div className={style.current_study_level_container}>
          {leveledStudyStatusData.map((a, i) => {
            const currentLevel = 1
            return (
              <div key={`LevelStudyStatus_${a.level}`}>
                <LeveledStudyStatusItem
                  levelName={a.level}
                  leveledStudyStatus={a.status}
                  leveledStudyTotalCount={a.total}
                  levelMaster={a.master === 'Y'}
                  levelMasterImage={a.masterImage}
                  studentLevel={currentLevel == i}
                />
              </div>
            )
          })}
        </div>
      </div>
      {/* 레벨을 셀렉트 박스에서 변경했을 때 활성화 됨 */}
      <div className={style.change_current_study_level}>
        <div className={style.txt_p}>
          선택한 레벨로 <b>학습 중인 레벨</b>을 변경하시겠어요?
        </div>
        <div className={style.confirm}>
          <div className={style.button}>예</div>
          <div className={style.button}>아니오</div>
        </div>
      </div>
    </>
  )
}

// 나의 학습 레벨 > 진행중인 전체 학습 레벨 > 레벨별 학습상태 아이템
const LeveledStudyStatusItem = ({
  levelMaster,
  levelMasterImage,
  studentLevel,
  levelName,
  leveledStudyStatus,
  leveledStudyTotalCount,
}: {
  levelMaster: boolean
  levelMasterImage: string
  studentLevel: boolean
  levelName: string
  leveledStudyStatus: string
  leveledStudyTotalCount: string
}) => {
  const style = useStyle(STYLE_ID)

  const statusImgae = [
    {
      per: 0,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_0.svg',
    },
    {
      per: 10,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_10.svg',
    },
    {
      per: 20,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_20.svg',
    },
    {
      per: 30,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_30.svg',
    },
    {
      per: 40,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_40.svg',
    },
    {
      per: 50,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_50.svg',
    },
    {
      per: 60,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_60.svg',
    },
    {
      per: 70,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_70.svg',
    },
    {
      per: 80,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_80.svg',
    },
    {
      per: 90,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_90.svg',
    },
    {
      per: 100,
      imgSrc: '/src/images/@my-study-level/leveled_study_progres_100.svg',
    },
  ]

  return (
    <div className={style.leveled_study_status_item}>
      {levelMaster ? (
        <div
          className={style.level_master_image}
          style={{ backgroundImage: `url("${levelMasterImage}")` }}></div>
      ) : (
        <div
          className={`${style.level_name} ${
            studentLevel && style.student_level
          }`}
          style={{
            backgroundImage: `url("${statusImgae[10].imgSrc}")`,
          }}>
          {levelName}
        </div>
      )}
      <div className={style.leveled_study_status}>
        <b>{leveledStudyStatus}</b> / {leveledStudyTotalCount}%
      </div>
    </div>
  )
}

// 나의 학습 레벨 > 레벨 테스트 이력
const LevelTestHistory = () => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.level_test_history}>
        <div>
          <div className={style.txt_h}>레벨 테스트 이력</div>
          <div className={style.txt_p}>
            레벨 테스트를 응시한 결과를 확인할 수 있어요. 2회차 레벨 테스트
            이후로는 180일이 지났을 때 재응시할 수 있어요.
          </div>
        </div>
        {/* 레벨 테스트 이력이 없을 때 */}
        {/* <EmptyMessage>레벨 테스트 이력이 없습니다.</EmptyMessage> */}
        <LevelTestHistoryItem testResultLevel={'3A'} testDate={'2023.10.25'} />
        <LevelTestHistoryItem testResultLevel={'2A'} testDate={'2023.10.24'} />
        <LevelTestHistoryItem testResultLevel={'1A'} testDate={'2023.4.25'} />
        <LevelTestHistoryItem testResultLevel={'KA'} testDate={'2022.11.25'} />
      </div>
      {/* 레벨 테스트가 가능인 상태일 때 활성화 됨 */}
      <div className={style.level_test_ready}>
        <div className={style.txt_p}>
          현재 <b>레벨 테스트</b>를 응시할 수 있습니다.
        </div>
        <Button shadow>레벨 테스트 응시하기</Button>
      </div>
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

  return (
    <div className={style.level_test_history_item} onClick={onClick}>
      <div className={style.col_a}>
        {/* <div className={style.level_symbol_box}>{testResultLevel}</div> */}
        <div className={style.test_result_info}>
          <div className={style.txt_l}>{testDate}</div>
          <div className={style.txt_p2}>
            레벨 테스트 결과: <b>{testResultLevel}</b>
          </div>
        </div>
      </div>
      <div className={style.col_b}>Report</div>
    </div>
  )
}

// 학습 설정
export function SetStudyMode() {
  const style = useStyle(STYLE_ID)

  const [isLevelUpMode, _isLevelUpMode] = useState(true)
  const [isChallengeMode, _isChallengeMode] = useState(false)

  return (
    <div className={style.set_study_mode}>
      <div className={style.row_a}>
        <div className={style.txt_h}>화면 모드</div>
        {/* 자유 모드, 코스 모드 */}
        <div className={style.choose_study_mode}>
          <ChooseStudyModeItem
            name="레벨업 모드"
            active={isLevelUpMode}
            levelUpIcon
            onClick={() => {
              _isLevelUpMode(true)
              _isChallengeMode(false)
            }}
          />
          <ChooseStudyModeItem
            name="챌린지 모드"
            active={isChallengeMode}
            challengeIcon
            onClick={() => {
              _isLevelUpMode(false)
              _isChallengeMode(true)
            }}
          />
        </div>
      </div>
      <div className={style.row_c}>
        <div className={style.txt_h}>eBook 읽기</div>
        <SetStudyOptionItem
          title="Listen & Repeat - Level K"
          discription="eBook KA ~ KC 레벨의 읽기 단계에서 전체 내용을 2회 반복 청취하는 액티비티을 제공합니다."
          check={false}
        />
        <SetStudyOptionItem
          title="Listen & Repeat - Level 1"
          discription="eBook 1A ~ 1C 레벨의 읽기 단계에서 전체 내용을 2회 반복 청취하는 액티비티을 제공합니다."
          check={false}
        />
      </div>
      <div className={style.row_b}>
        <div className={style.txt_h}>퀴즈 설정 (Level 2 이상)</div>
        <SetStudyOptionItem
          title="Vocabulary Hint / Skip"
          discription="Vocabulary 퀴즈를 풀다가 막혔을 때 힌트를 보거나 다음 문제로 건너뛸 수
        있습니다."
          check={true}
        />
        <SetStudyOptionItem
          title="Summary Chance"
          discription="Summary 퀴즈를 풀다가 막혔을 때 찬스를 써서 다음 문제로 건너뛸 수 있습니다."
          check={true}
        />
      </div>
      <Button shadow width={'100%'}>
        저장하기
      </Button>
    </div>
  )
}

// 학습 설정 > 학습 모드 선택 아이템
const ChooseStudyModeItem = ({
  name,
  active,
  onClick,
  levelUpIcon,
  challengeIcon,
}: {
  name: string
  active: boolean
  onClick?: () => void
  levelUpIcon?: boolean
  challengeIcon?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.choose_study_mode_item} ${active && style.active}`}
      onClick={onClick}>
      {levelUpIcon &&
        (active ? (
          <Image
            alt=""
            src="/src/images/@set-study-mode/book_icon_on.svg"
            width={24}
            height={24}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/@set-study-mode/book_icon_off.svg"
            width={24}
            height={24}
          />
        ))}
      {challengeIcon &&
        (active ? (
          <Image
            alt=""
            src="/src/images/@set-study-mode/crown_icon_on.svg"
            width={24}
            height={24}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/@set-study-mode/crown_icon_off.svg"
            width={24}
            height={24}
          />
        ))}
      {name}
    </div>
  )
}

// 학습 설정 > 학습 옵션 설정 아이템
const SetStudyOptionItem = ({
  check,
  title,
  discription,
}: {
  check: boolean
  title: string
  discription: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.set_study_option_item} ${check && style.checked}`}>
      <div className={style.row_a1}>
        <span className={style.txt_h1}>{title}</span>
        <CheckBox check={check} />
      </div>
      <div className={style.row_b}>{discription}</div>
    </div>
  )
}
