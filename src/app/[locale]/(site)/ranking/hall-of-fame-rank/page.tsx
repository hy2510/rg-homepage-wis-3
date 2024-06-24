'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useOnLoadHallOfFame } from '@/client/store/ranking/hall-of-fame/hook'
import { HallOfFameResponse } from '@/repository/client/ranking/hall-of-fame'
import { Button, Modal } from '@/ui/common/common-components'
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_hall_of_fame_rank'

const RECORD_SIZE = 50

export default function Page() {
  const { payload, loading, error } = useOnLoadHallOfFame()

  if (loading) {
    return <></>
  }
  return <HallOfFameLayout data={payload} />
}

type HallOfFameListItem = {
  id: string
  rank: number
  medal: string
  studentName: string
  earnPoints: number
  bookCount: number
  date: string
}

const HallOfFameLayout = ({ data }: { data: HallOfFameResponse }) => {
  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'

  const [viewModal, _viewModal] = useState(false)

  const [page, setPage] = useState(0)
  const boardList: HallOfFameListItem[] = data.list
    .filter((_, idx) => idx < RECORD_SIZE * (page + 1))
    .map((item) => {
      return {
        id: item.hallOfFameId,
        rank: item.no,
        medal: item.hallOfFameGrade.toLocaleLowerCase(),
        studentName: item.studentName,
        bookCount: item.bookCount,
        earnPoints: item.rgPoint,
        date: item.registDate.substring(0, 10),
      }
    })
  if (data.user) {
    const item = data.user
    const userBoard = {
      id: item.hallOfFameId,
      rank: item.no,
      medal: item.hallOfFameGrade.toLocaleLowerCase(),
      studentName: item.studentName,
      bookCount: item.bookCount,
      earnPoints: item.rgPoint,
      date: item.registDate.substring(0, 10),
    }
    boardList.unshift(userBoard)
  }
  const hasMore = boardList.length < data.list.length + (data.user ? 1 : 0)

  return (
    <main className={style.hall_off_fame_rank}>
      <div className={style.group_comment}>
        <span className={style.txt_comment}>
          명예의 전당에 등재된 학생들은 Reading Gate의 R포인트를 10,000점 이상
          획득한 학생들입니다.
        </span>
        <div
          className={style.btn_link}
          onClick={() => {
            _viewModal(true)
          }}>
          <span>등급 및 장학 혜택</span>
        </div>
        {viewModal && (
          <Modal
            header
            title={'등급 및 장학혜택'}
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
                  ? '/src/html/page-contents/mobile/ranking/ranking_03_scholarship_benefits_pop.html'
                  : '/src/html/page-contents/pc/ranking/ranking_03_scholarship_benefits_pop.html'
              }
              style={{
                height: isMobile ? '1175px' : '870px',
                backgroundColor: 'transparent',
                overflow: 'hidden',
              }}
            />
          </Modal>
        )}
      </div>
      <div className={style.group_leaderboard}>
        <Leaderboard list={boardList} />
      </div>
      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button width="160px" onClick={() => setPage(page + 1)}>
            More
          </Button>
        </div>
      )}
    </main>
  )
}

// 리더보드
const Leaderboard = ({ list }: { list: HallOfFameListItem[] }) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.leaderboard}>
      <div className={style.table_header}>
        <div className={style.th_item}>순위</div>
        <div className={style.th_item}>학생 이름</div>
        <div className={style.th_item}>등재일</div>
        <div className={style.th_item}>포인트 / 학습 권수</div>
      </div>
      {list.map((a) => {
        return (
          <LeaderboardTableRow
            key={`${a.id}_${a.studentName}`}
            id={a.id}
            rank={a.rank}
            medal={a.medal}
            studentName={a.studentName}
            earnPoints={a.earnPoints}
            bookCount={a.bookCount}
            date={a.date}
          />
        )
      })}
    </div>
  )
}

// 리더보드 테이블 아이템
const LeaderboardTableRow = ({
  rank,
  medal,
  studentName,
  earnPoints,
  bookCount,
  date,
}: HallOfFameListItem) => {
  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'

  let medalImage: string = ''
  if (medal == 'titanium') {
    medalImage = '/src/images/@ranking/hall-of-fame/titanium.png'
  } else if (medal == 'platinum') {
    medalImage = '/src/images/@ranking/hall-of-fame/platinum.png'
  } else if (medal == 'gold') {
    medalImage = '/src/images/@ranking/hall-of-fame/gold.png'
  } else if (medal == 'silver') {
    medalImage = '/src/images/@ranking/hall-of-fame/silver.png'
  } else if (medal == 'bronze') {
    medalImage = '/src/images/@ranking/hall-of-fame/bronze.png'
  }

  return (
    <div className={style.table_row}>
      <div className={style.rank}>{rank}</div>
      <div className={style.student_name}>
        <Image
          alt=""
          src={medalImage}
          width={60}
          height={60}
          style={{ width: isMobile ? 30 : 60, height: 'auto' }}
        />
        <div className={style.txt_student_name}>{studentName}</div>
      </div>
      <div className={style.txt_date}>{date}</div>
      <div className={style.txt_earn_points}>
        {earnPoints} / {bookCount}
      </div>
    </div>
  )
}
