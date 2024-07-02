'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import {
  useOnLoadPointRankingMonthly,
  useOnLoadPointRankingTotal,
} from '@/client/store/ranking/point/hook'
import { usePointRanking } from '@/client/store/ranking/point/selector'
import { Dropdown, DropdownItem, Modal } from '@/ui/common/common-components'
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'

const STYLE_ID = 'page_points_rank'

export default function Page() {
  const { loading } = useOnLoadPointRankingMonthly()
  const { loading: loading2 } = useOnLoadPointRankingTotal()

  if (loading || loading2) {
    return <LoadingScreen />
  }
  return (
    <main>
      <PointRank />
    </main>
  )
}

function PointRank() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [tab, setTab] = useState('monthly')

  const monthRank = usePointRanking().monthly.payload
  const totalRank = usePointRanking().total.payload

  const rank = tab === 'monthly' ? monthRank : totalRank
  const rankList = rank.list
  const rankUser = rank.user

  const SubTitle = ({
    children,
    message,
  }: {
    children?: ReactNode
    message?: string
  }) => {
    return (
      <div className={style.sub_title}>
        {children}
        <span>{message}</span>
      </div>
    )
  }

  const UserEngagementStatus = ({
    userAvatar,
    userRank,
    studentName = '',
    completed = 0,
    earnPoints = 0.0,
  }: {
    userAvatar: string
    userRank: number
    studentName?: string
    completed?: number
    earnPoints?: number
  }) => {
    const ColumnBox = ({
      label,
      contents,
    }: {
      label: string
      contents: string
    }) => {
      return (
        <div className={style.column_box}>
          <div className={style.label}>{label}</div>
          <div className={style.contents}>{contents}</div>
        </div>
      )
    }

    return (
      <div className={style.user_engagement_status}>
        <div className={style.user_symbol}>
          {userRank >= 1 && userRank < 1000 && (
            <div className={style.user_rank}>
              <div className={style.txt_rank}>{userRank}</div>
            </div>
          )}
          <div className={style.user_avatar}>
            <Image alt="" src={userAvatar} width={100} height={100} />
          </div>
        </div>
        <ColumnBox label={t('t289')} contents={studentName} />
        <ColumnBox label={t('t395')} contents={completed.toString()} />
        <ColumnBox label={t('t160')} contents={earnPoints.toString()} />
      </div>
    )
  }

  const Leaderboard = () => {
    const TableRow = ({
      rank,
      studentAvatar,
      studentName,
      earnPoints,
      completed,
    }: {
      rank?: number
      studentAvatar?: string
      studentName?: string
      earnPoints?: number
      completed?: number
    }) => {
      return (
        <div
          className={`
          ${style.table_row} 
          ${rank && rank < 4 ? style.top_ranker : ''}`}>
          <div
            className={`
            ${style.rank} 
            ${
              rank == 3
                ? style.rank3
                : rank == 2
                  ? style.rank2
                  : rank == 1
                    ? style.rank1
                    : ''
            }`}>
            {rank}
          </div>
          <div
            className={`${style.student_name} ${
              rank == 3
                ? style.rank3
                : rank == 2
                  ? style.rank2
                  : rank == 1
                    ? style.rank1
                    : ''
            }`}>
            <Image alt="" src={studentAvatar || ''} width={60} height={60} />
            <div className={style.txt_student_name}>{studentName}</div>
          </div>
          <div className={style.txt_earn_points}>{earnPoints && Math.floor(earnPoints * 10) / 10}</div>
          <div className={style.txt_completed}>{completed}</div>
        </div>
      )
    }

    return (
      <div className={style.leaderboard}>
        <div className={style.table_header}>
          <div className={style.th_item}>{t('t396')}</div>
          <div className={style.th_item}>{t('t289')}</div>
          <div className={style.th_item}>{t('t160')}</div>
          <div className={style.th_item}>{t('t395')}</div>
        </div>
        {rankList.map((a) => {
          return (
            <TableRow
              key={`Rank_${a.no}`}
              rank={a.no}
              studentAvatar={a.imgRankingList2}
              studentName={a.name}
              earnPoints={a.rgPoint}
              completed={a.bookCount}
            />
          )
        })}
      </div>
    )
  }

  const isMobile = useScreenMode() === 'mobile'
  const [viewModal, _viewModal] = useState(false)

  return (
    <main className={style.point_rank}>
      <Dropdown
        title={
          tab === 'monthly'
            ? `${t('t402', { num: new Date().getMonth() + 1 })}`
            : `${t('t403')}`
        }>
        <DropdownItem onClick={() => setTab('monthly')}>
          {t('t404')}
        </DropdownItem>
        <DropdownItem onClick={() => setTab('total')}>{t('t403')}</DropdownItem>
      </Dropdown>
      <div>
        <span style={{ color: '#9b9b9b', fontSize: '0.85em' }}>
          오늘 학습한 기록은 내일 오전 랭킹에 반영됩니다.
        </span>
      </div>

      {rankUser && (
        <>
          <SubTitle>{t('t405')}</SubTitle>
          <UserEngagementStatus
            userAvatar={rankUser.imgRankingList2}
            userRank={rankUser.no}
            studentName={rankUser.name}
            earnPoints={rankUser.bookCount}
            completed={rankUser.bookCount}
          />
        </>
      )}
      <div className={style.group_sub_title}>
        <SubTitle
          message={false ? `${t('t399')} : 2023.05.23 화요일 오전 12:04` : ''}>
          {t('t400')}
        </SubTitle>
        <div
          className={style.txt_link}
          onClick={() => {
            _viewModal(true)
          }}>
          {t('t406')}
        </div>
        {viewModal && (
          <Modal
            compact
            header
            title={t('t407')}
            onClickDelete={() => {
              _viewModal(false)
            }}
            onClickLightbox={() => {
              _viewModal(false)
            }}>
            <iframe
              width={'100%'}
              frameBorder="0"
              scrolling="no"
              src={
                isMobile
                  ? '/src/html/page-contents/mobile/ranking/ranking_01_point_pop.html'
                  : '/src/html/page-contents/pc/ranking/ranking_01_point_pop.html'
              }
              style={{
                height: isMobile ? '1065px' : '867px',
                backgroundColor: 'transparent',
                overflow: 'hidden',
              }}
            />
          </Modal>
        )}
      </div>
      <Leaderboard />
    </main>
  )
}
