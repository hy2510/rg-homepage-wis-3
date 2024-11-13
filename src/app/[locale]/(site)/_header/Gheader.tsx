'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useStudentAvatar } from '@/client/store/student/avatar/selector'
import { useStudentIsLogin } from '@/client/store/student/info/selector'
import {
  useScreenMode,
  useStyle,
  useThemeMode,
} from '@/ui/context/StyleContext'
import BookSearchBar from '@/ui/modules/library-book-search-bar/BookSearchBar'
import { CalendarModal } from './CalendarModal'
import { MyRgModal } from './MyRgModal'
import { NoticeModal } from './NoticeModal'
import { QuestModal } from './QuestModal'
import { StreakModal } from './StreakModal'
import { useStudentContinuousStudy } from '@/client/store/student/continuous-study/selector'
import StreakFire from '@/ui/modules/StreakFire'

const STYLE_ID = 'global_header'

const MENU = {
  home: {
    key: '/home',
    href: SITE_PATH.HOME.MAIN,
    icon: '/src/images/@global-header/home.svg',
    mobileIconOn: '/src/images/@global-header/home_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/home_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/home_on_mobile_white.svg',
    mobileDarkIconOff: '/src/images/@global-header/home_off_mobile_white.svg',
    name: '홈',
  },
  about: {
    key: '/about',
    href: SITE_PATH.ABOUT.ABOUT,
    icon: '/src/images/@global-header/about_rg.svg',
    mobileIconOn: '/src/images/@global-header/about_rg_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/about_rg_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/about_rg_on_mobile_white.svg',
    mobileDarkIconOff:
      '/src/images/@global-header/about_rg_off_mobile_white.svg',
    name: '소개',
  },
  trial: {
    key: '/trial',
    href: SITE_PATH.HOME.MAIN,
    icon: '/src/images/@global-header/trial.svg',
    mobileIconOn: '/src/images/@global-header/trial_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/trial_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/trial_on_mobile_white.svg',
    mobileDarkIconOff: '/src/images/@global-header/trial_off_mobile_white.svg',
    name: '체험',
  },
  kids: {
    key: '/kids',
    href: SITE_PATH.KIDS.DODO_ABC,
    icon: '/src/images/@global-header/kids.svg',
    mobileIconOn: '/src/images/@global-header/kids_m_on.svg',
    mobileIconOff: '/src/images/@global-header/kids_m_off.svg',
    mobileDarkIconOn:
      '/src/images/@global-header/kids_m_on_white.svg',
    mobileDarkIconOff:
      '/src/images/@global-header/kids_m_off_white.svg',
    name: '기초',
  },
  study: {
    key: '/library',
    href: SITE_PATH.LIBRARY.HOME,
    icon: '/src/images/@global-header/study_room.svg',
    mobileIconOn: '/src/images/@global-header/study_room_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/study_room_off_mobile.svg',
    mobileDarkIconOn:
      '/src/images/@global-header/study_room_on_mobile_white.svg',
    mobileDarkIconOff:
      '/src/images/@global-header/study_room_off_mobile_white.svg',
    name: '학습',
  },
  review: {
    key: '/review',
    href: SITE_PATH.REVIEW.SIMPLE,
    icon: '/src/images/@global-header/review.svg',
    mobileIconOn: '/src/images/@global-header/review_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/review_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/review_on_mobile_white.svg',
    mobileDarkIconOff: '/src/images/@global-header/review_off_mobile_white.svg',
    name: '리뷰',
  },
  ranking: {
    key: '/ranking',
    href: SITE_PATH.RANKING.POINT,
    icon: '/src/images/@global-header/ranking.svg',
    mobileIconOn: '/src/images/@global-header/ranking_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/ranking_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/ranking_on_mobile_white.svg',
    mobileDarkIconOff:
      '/src/images/@global-header/ranking_off_mobile_white.svg',
    name: '랭킹',
  },
}

// 공통상단
export default function Gheader() {
  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'
  const appType = useApplicationType()
  const isShowSignUp = appType === 'private'

  const [modalViewName, setModalViewName] = useState<
    ModalViewNameType | undefined
  >(undefined)

  const logOnStatus = useStudentIsLogin()

  const onCloseModal = useCallback((_: boolean) => {
    setModalViewName(undefined)
  }, [])
  const onShowModal = useCallback((name: ModalViewNameType) => {
    setModalViewName(name)
  }, [])

  const pathname = usePathname()

  useEffect(() => {
    if (modalViewName) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [modalViewName])

  if (appType === 'app' && !logOnStatus) {
    return <></>
  }
  return (
    <>
      <div className={`${style.global_header} ${pathname.indexOf(MENU.kids.href) != -1 && style.dodo_abc} ${pathname.indexOf(MENU.about.href) != -1 && style.about}`}>
        <div className={`${style.global_header_container} container`}>
          <div className={style.company_logo}>
            <a href={SITE_PATH.HOME.MAIN}>
              <Image
                alt=""
                src="/src/images/@global-header/company_logo_white.svg"
                width={48}
                height={40}
              />
            </a>
          </div>
          <GNBMenu
            pathname={pathname}
            isLogOn={logOnStatus}
            isMobile={isMobile}
            isShowSignUp={isShowSignUp}
            onClick={onShowModal}
          />
        </div>
      </div>
      <div className={style.global_header_back_spcae}></div>
      {modalViewName === 'calendar' && (
        <CalendarModal _viewCalendarModal={onCloseModal} />
      )}
      {modalViewName === 'streak' && (
        <StreakModal _viewStreakModal={onCloseModal} />
      )}
      {modalViewName === 'quest' && (
        <QuestModal _viewQuestModal={onCloseModal} />
      )}
      {modalViewName === 'notice' && (
        <NoticeModal _viewNoticeModal={onCloseModal} />
      )}
      {modalViewName === 'my' && <MyRgModal _viewMyRgModal={onCloseModal} />}
    </>
  )
}

type ModalViewNameType = 'calendar' | 'streak' | 'quest' | 'notice' | 'my'
function GNBMenu({
  pathname,
  isLogOn,
  isMobile,
  isShowSignUp,
  onClick,
}: {
  pathname: string
  isLogOn: boolean
  isMobile: boolean
  isShowSignUp?: boolean
  onClick: (name: ModalViewNameType) => void
}) {
  if (isLogOn) {
    return (
      <>
        <GnbLogOn pathname={pathname} isMobile={isMobile} onClick={onClick} />
        {isMobile && <GnbLogOnMobile pathname={pathname} />}
      </>
    )
  } else {
    return (
      <>
        <GnbLogOff
          pathname={pathname}
          isMobile={isMobile}
          isShowSignUp={isShowSignUp}
        />
        {isMobile && <GnbLogOffMobile pathname={pathname} />}
      </>
    )
  }
}

function GnbLogOn({
  pathname,
  isMobile,
  onClick,
}: {
  pathname: string
  isMobile?: boolean
  onClick: (name: ModalViewNameType) => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const avatar = useStudentAvatar().payload
  const filteredAvatar = avatar.avatars.filter(
    (item) => item.avatarId === avatar.avatarId,
  )
  const userAvatarImage =
    filteredAvatar.length > 0
      ? filteredAvatar[0].imgRankingList1
      : 'https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_03.png'

  return (
    <>
      {!isMobile && (
        <div className={style.gnb_log_off}>
          <GnbButton
            active={pathname.indexOf(MENU.kids.key) != -1}
            imgSrc={MENU.kids.icon}
            // menuName={t('t028')}
            menuName={'기초'}
            href={MENU.kids.href}
          />  
          <GnbButton
            active={pathname.indexOf(MENU.study.key) != -1}
            imgSrc={MENU.study.icon}
            // menuName={t('t031')}
            menuName={'도서'}
            href={MENU.study.href}
          />
          <GnbButton
            active={pathname.indexOf(MENU.review.key) != -1}
            imgSrc={MENU.review.icon}
            menuName={t('t032')}
            href={MENU.review.href}
          />
          <GnbButton
            active={pathname.indexOf(MENU.ranking.key) != -1}
            imgSrc={MENU.ranking.icon}
            menuName={t('t033')}
            href={MENU.ranking.href}
          />
        </div>
      )}
      <div className={style.option_buttons}>
        {/* <OptionButton
            imgSrc="/src/images/@global-header/refresh.svg"
            onClick={() => {
              location.reload();
            }}
        /> */}
        <OptionButton
          isCalendar
          onClick={() => {
            onClick('calendar')
          }}
        />
        <OptionButton
          isStreak
          onClick={() => {
            onClick('streak')
          }}
        />
        <OptionButton
          imgSrc="/src/images/@global-header/quest.svg"
          onClick={() => {
            onClick('quest')
          }}
        />
        {/* 
        * FIXME: 2024-03-14 결정사항: 알림기능 부제로 인하여 아이콘 숨김 처리
      <OptionButton
        imgSrc="/src/images/@global-header/notice.svg"
        onClick={() => {
          onClick('notice')
        }}
        isNotice={true}
      /> 
      */}
        <OptionButton
          isAvatar
          imgSrc={userAvatarImage}
          onClick={() => {
            onClick('my')
          }}
        />
      </div>
    </>
  )
}

// 공통하단 > 로그온 상태의 메뉴 (모바일)
const GnbLogOnMobile = ({ pathname }: { pathname: string }) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const [searchOn, _searchOn] = useState(false)

  /*
  useEffect(() => {
    if (searchOn) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [])
  */
  const isDarkMode = useThemeMode() === 'dark'

  return (
    <div className={style.gnb_log_on_mobile}>
      {/* <MenuButton
        active={pathname.indexOf(MENU.home.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.home.mobileDarkIconOff : MENU.home.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.home.mobileDarkIconOn : MENU.home.mobileIconOn
        }
        name={t('t028')}
        href={MENU.home.href}
      /> */}
      <MenuButton
        active={pathname.indexOf(MENU.kids.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.kids.mobileDarkIconOff : MENU.kids.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.kids.mobileDarkIconOn : MENU.kids.mobileIconOn
        }
        name={'기초'}
        href={MENU.kids.href}
      />
      <MenuButton
        active={pathname.indexOf(MENU.study.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.study.mobileDarkIconOff : MENU.study.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.study.mobileDarkIconOn : MENU.study.mobileIconOn
        }
        // name={t('t031')}
        name={'도서'}
        href={MENU.study.href}
      />
      <SearchButton
        searchOn={searchOn}
        onChangeSearchState={(isOn) => {
          _searchOn(isOn)
        }}
      />
      <MenuButton
        active={pathname.indexOf(MENU.review.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.review.mobileDarkIconOff : MENU.review.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.review.mobileDarkIconOn : MENU.review.mobileIconOn
        }
        name={t('t032')}
        href={MENU.review.href}
      />
      <MenuButton
        active={pathname.indexOf(MENU.ranking.key) != -1}
        imgSrcBtnOff={
          isDarkMode
            ? MENU.ranking.mobileDarkIconOff
            : MENU.ranking.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.ranking.mobileDarkIconOn : MENU.ranking.mobileIconOn
        }
        name={t('t033')}
        href={MENU.ranking.href}
      />
    </div>
  )
}

function GnbLogOff({
  pathname,
  isMobile,
  isShowSignUp,
}: {
  pathname: string
  isMobile?: boolean
  isShowSignUp?: boolean
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <>
      {!isMobile && (
        <div className={style.gnb_log_on}>
          <GnbButton
            active={pathname.indexOf(MENU.home.key) != -1}
            imgSrc={MENU.home.icon}
            menuName={t('t028')}
            href={MENU.home.href}
          />
          <GnbButton
            active={pathname.indexOf(MENU.about.key) != -1}
            imgSrc={MENU.about.icon}
            menuName={t('t029')}
            href={MENU.about.href}
          />
          <GnbButton
            active={pathname.indexOf(MENU.trial.key) != -1}
            imgSrc={MENU.trial.icon}
            menuName={t('t030')}
            href={MENU.trial.href}
          />
        </div>
      )}
      <div className={style.sign_buttons}>
        <Link href={SITE_PATH.ACCOUNT.MAIN}>{t('t214')}</Link>
        {isShowSignUp && (
          <Link href={SITE_PATH.ACCOUNT.SIGN_UP}>{t('t267')}</Link>
        )}
      </div>
    </>
  )
}

// 공통하단 > 로그오프 상태의 메뉴 (모바일)
const GnbLogOffMobile = ({ pathname }: { pathname: string }) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const isDarkMode = useThemeMode() === 'dark'

  return (
    <div className={style.gnb_log_off_mobile}>
      <MenuButton
        active={pathname.indexOf(MENU.home.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.home.mobileDarkIconOff : MENU.home.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.home.mobileDarkIconOn : MENU.home.mobileIconOn
        }
        name={t('t028')}
        href={MENU.home.href}
      />
      <MenuButton
        active={pathname.indexOf(MENU.about.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.about.mobileDarkIconOff : MENU.about.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.about.mobileDarkIconOn : MENU.about.mobileIconOn
        }
        name={t('t029')}
        href={MENU.about.href}
      />
      <MenuButton
        active={pathname.indexOf(MENU.trial.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.trial.mobileDarkIconOff : MENU.trial.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.trial.mobileDarkIconOn : MENU.trial.mobileIconOn
        }
        name={t('t030')}
        href={MENU.trial.href}
      />
    </div>
  )
}

// 공통상단 > 메뉴 버튼
const GnbButton = ({
  menuName,
  active,
  href,
  imgSrc,
}: {
  menuName: string
  active: boolean
  href: string
  imgSrc: string
}) => {
  const style = useStyle(STYLE_ID)
  return (
    <Link href={href}>
      <div className={`${style.gnb_button} ${active && style.active}`}>
        <Image alt="" src={imgSrc} width={24} height={24} />
        <span>{menuName}</span>
      </div>
    </Link>
  )
}

// 옵션 버튼
const OptionButton = ({
  isCalendar,
  isStreak,
  isAvatar,
  isNotice,
  onClick,
  imgSrc = '',
}: {
  isCalendar?: boolean
  isStreak?: boolean
  isAvatar?: boolean
  isNotice?: boolean
  onClick: () => void
  imgSrc?: string
}) => {
  const style = useStyle(STYLE_ID)

  const date = new Date()
  const today = ('0' + date.getDate()).slice(-2)
  const monthNames = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ]
  const mon = monthNames[date.getMonth()]

  const continuousDay = useStudentContinuousStudy()

  return (
    <>
      {isCalendar ? (
        <div className={style.option_button} onClick={onClick}>
          <div className={style.calendar}>
            <div className={style.date}>
              <div className={style.month}>{mon}</div>
              <div className={style.today}>{today}</div>
            </div>
            <div className={style.calendar_icon}>
              <Image
                alt=""
                src="/src/images/@global-header/calendar.svg"
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>
      ) : isStreak ? (
        <div className={style.option_button} onClick={onClick}>
          <div className={style.streak}>
            { continuousDay == 0 ? <>
                <div className={style.txt_days}></div>
                <Image alt="" src={'/src/images/@global-header/streak.svg'} width={26} height={26} />
              </>   
              : <>
                {continuousDay > 5000 ? <div className={style.txt_days} style={{color: '#fff'}}>Max</div> : <div className={style.txt_days} style={{color: '#fff'}}>{continuousDay}</div>}
                <StreakFire />
                {/* <Image alt="" src={'/src/images/@global-header/streak_on.svg'} className='heartbeat' width={26} height={26} /> */}
              </>
            }
            
          </div>
        </div>
      ) : isAvatar ? (
        <div
          className={`${style.option_button} ${style.avatar}`}
          onClick={onClick}>
          <Image alt="" src={imgSrc} width={40} height={40} />
        </div>
      ) : (
        <div className={style.option_button} onClick={onClick}>
          {/* 새로운 알림이 있을 때 표시되는 점 */}
          {isNotice && <div className={style.new_dot}></div>}
          <Image alt="" src={imgSrc} width={26} height={26} />
        </div>
      )}
    </>
  )
}

const SearchButton = ({
  searchOn,
  onChangeSearchState,
}: {
  searchOn: boolean
  onChangeSearchState?: (isOn: boolean) => void
}) => {
  const style = useStyle(STYLE_ID)

  const imgSrc = searchOn
    ? '/src/images/delete-icons/x_white.svg'
    : '/src/images/search-icons/search_white.svg'
  const imgSize = searchOn ? 28 : 24
  return (
    <div className={style.search_button}>
      <div
        className={`${style.search_toggle} ${searchOn && style.active}`}
        onClick={() => onChangeSearchState && onChangeSearchState(!searchOn)}>
        <Image src={imgSrc} width={imgSize} height={imgSize} alt="" />
      </div>
      {searchOn && (
        <div className={style.search_area}>
          {/* 검색필드 */}
          {/* 아이콘들 */}
          <BookSearchBar
            isMobile={true}
            onCloseBookSearchPopup={() =>
              onChangeSearchState && onChangeSearchState(false)
            }
          />
        </div>
      )}
    </div>
  )
}

const MenuButton = ({
  imgSrcBtnOff,
  imgSrcBtnOn,
  name,
  active,
  href,
}: {
  imgSrcBtnOff: string
  imgSrcBtnOn: string
  name: string
  active: boolean
  href: string
}) => {
  const style = useStyle(STYLE_ID)

  const imgSrc = active ? imgSrcBtnOn : imgSrcBtnOff
  return (
    <Link href={href}>
      <div className={style.menu_button}>
        <Image src={imgSrc} width={24} height={24} alt="" />
        <div className={`${style.menu_name} ${active && style.active}`}>
          {name}
        </div>
      </div>
    </Link>
  )
}
