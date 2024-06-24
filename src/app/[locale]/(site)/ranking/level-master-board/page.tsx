'use client'

import LevelUtils from '@/util/level-utils'
import { useState } from 'react'
import { useOnLoadLevelMasterBoard } from '@/client/store/ranking/level-master-board/hook'
import { LevelMasterBoardResponse } from '@/repository/client/ranking/level-master'
import { Button } from '@/ui/common/common-components'

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
    <main>
      <div>
        <span>
          최근 한달동안 레벨업된 학생을 확인하실 수 있습니다. 오늘 학습한 기록은
          내일 오전 랭킹에 반영됩니다.
        </span>
      </div>
      <div>
        <LevelMasterBoard list={boardList} />
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

const LevelMasterBoard = ({ list }: { list: LevelMasterListItem[] }) => {
  return (
    <div>
      <div>
        <span>번호|</span>
        <span>아바타|</span>
        <span>이전레벨|</span>
        <span>현재레벨|</span>
        <span>학생이름|</span>
        <span>날짜</span>
      </div>
      {list.length > 0 && (
        <div>
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
  return (
    <div>
      <span>{no}|</span>
      <img src={avatar} width={50} />
      <span>
        |{beforeLevelName}
        {` Master | `}
      </span>
      <span>
        {currentLevelName} {` Level Up | `}
      </span>
      <span>{studentName}|</span>
      <span>{date}</span>
    </div>
  )
}
