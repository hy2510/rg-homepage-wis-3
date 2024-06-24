'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Nav, NavItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'ranking_nav_bar'

export const RankingNavBar = () => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()
  const connectPointsRank = pathname.indexOf('points-rank') != -1
  const connectChallengeRank = pathname.indexOf('challenge-rank') != -1
  const connectHallOfFameRank = pathname.indexOf('hall-of-fame-rank') != -1
  const connectLevelMasterBoard = pathname.indexOf('level-master-board') != -1

  return (
    <div className={style.ranking_nav_bar}>
      <div className={style.txt_h}>{t('t532')}</div>
      <Nav>
        <Link href={SITE_PATH.RANKING.POINT}>
          <NavItem active={connectPointsRank}>{t('t533')}</NavItem>
        </Link>
        <Link href={SITE_PATH.RANKING.CAHLLENGE}>
          <NavItem active={connectChallengeRank}>{t('t330')}</NavItem>
        </Link>
        <Link href={SITE_PATH.RANKING.LEVEL_MASTER_BOARD}>
          <NavItem active={connectLevelMasterBoard}>{t('t041')}</NavItem>
        </Link>
        <Link href={SITE_PATH.RANKING.HALL_OF_FAME}>
          <NavItem active={connectHallOfFameRank}>{t('t318')}</NavItem>
        </Link>
      </Nav>
    </div>
  )
}
