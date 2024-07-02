'use client'

import LevelUtils from '@/util/level-utils'
import { useState } from 'react'
import { useOnLoadLevelMasterBoard } from '@/client/store/ranking/level-master-board/hook'
import { LevelMasterBoardResponse } from '@/repository/client/ranking/level-master'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'

const STYLE_ID = 'page_level_master_board'

const RECORD_SIZE = 50

export default function Page() {
  const { payload, loading, error } = useOnLoadLevelMasterBoard()

  if (loading) {
    return <div></div>
  }

  return <LevelMasterLayout data={payload} />
}

type LevelMasterListItem = {
  no: number
  avatar: string
  beforeLevelName: string
  currentLevelName: string
  studentName: string
  date: string
}

const LevelMasterLayout = ({ data }: { data: LevelMasterBoardResponse }) => {
  const style = useStyle(STYLE_ID)
  
  const [page, setPage] = useState(0)
  const boardList: LevelMasterListItem[] = data.list
    .filter((_, idx) => idx < RECORD_SIZE * (page + 1))
    .map((item) => {
      return {
        no: item.no,
        avatar: item.imgAvatarList,
        beforeLevelName: LevelUtils.previousLevel(item.levelName) || '',
        currentLevelName: item.levelName,
        studentName: item.studentName2,
        date: item.levelDate,
      }
    })
  const hasMore = boardList.length < data.list.length

  return (
    <main className={style.level_master_layout}>
      <div style={{color: 'rgb(155, 155, 155)', fontSize: '0.85em'}}>
        최근 30일간 레벨 마스터를 획득한 학생입니다. 오늘 학습한 기록은 내일 오전 랭킹에 반영됩니다.
      </div>
      <LevelMasterBoard list={boardList} />
      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button width="150px" color='dark' roundFull onClick={() => setPage(page + 1)}>
            more
          </Button>
        </div>
      )}
    </main>
  )
}

const LevelMasterBoard = ({ list }: { list: LevelMasterListItem[] }) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.level_master_board}>
      <div className={style.header}>
        <span>번호</span>
        <span>학생 이름</span>
        <span>레벨 마스터</span>
        <span>날짜</span>
      </div>
      {list.length > 0 && (
        <div className={style.table}>
          {list.map((item) => {
            return (
              <LevelMasterBoardTableRow
                key={`level-master-${item.no}`}
                no={item.no}
                avatar={item.avatar}
                beforeLevelName={item.beforeLevelName}
                currentLevelName={item.currentLevelName}
                studentName={item.studentName}
                date={item.date}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const LevelMasterBoardTableRow = ({
  no,
  avatar,
  beforeLevelName,
  currentLevelName,
  studentName,
  date,
}: LevelMasterListItem) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.level_master_board_table_row}>
      <div className={style.txt_xl}>{no}</div>
      <div className={style.student}>
        <div className={style.avatar} style={{backgroundImage: `url(${avatar})`}}></div>
        <div className={style.student_name}>{studentName}</div>
      </div>
      <div className={style.txt_xl}>{beforeLevelName}</div>
      {/* <div className={`${style.txt_gray} ${style.txt_l}`}>{currentLevelName}</div> */}
      <div className={style.txt_gray}>{date}</div>
    </div>
  )
}
