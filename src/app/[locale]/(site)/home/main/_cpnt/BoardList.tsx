'use client'

import PaginationBar from '@/ui/common/PaginationBar'
import {
  Margin,
  NoticeBoardContainer,
  NoticeBoardItem,
} from '@/ui/common/common-components'

export default function BoardList({
  list,
  page,
  maxPage,
  onPageClick,
}: {
  list: { title: string; date: string; link: string }[]
  page: number
  maxPage: number
  onPageClick?: (page: number) => void
}) {
  return (
    <div>
      <NoticeBoardContainer>
        {list.map((a) => {
          return (
            <NoticeBoardItem
              key={`notice-${a.link}`}
              title={a.title}
              date={a.date}
              href={a.link}
            />
          )
        })}
      </NoticeBoardContainer>
      <Margin height={30} />
      <PaginationBar page={page} maxPage={maxPage} onPageClick={onPageClick} />
    </div>
  )
}
