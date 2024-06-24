'use client'

import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useOnLoadBoardNoticeList } from '@/client/store/home/hook'
import BoardList from './BoardList'

export default function NoticeBoardList({ page }: { page: number }) {
  const { payload, loading, error } = useOnLoadBoardNoticeList({ page })

  const noticeList = [
    ...payload.board.map((board) => {
      return {
        title: board.title,
        date: board.registDate.split('T')[0],
        link: `${SITE_PATH.HOME.NEWS_POST}/${board.notifyId}`,
      }
    }),
  ]
  const maxPage = payload?.page?.totalPages || 0

  const route = useRouter()
  const onPageChange = (page: number) => {
    route.push(`${SITE_PATH.HOME.NOTICE}?page=${page}`)
  }

  return (
    <BoardList
      list={noticeList}
      page={page}
      maxPage={maxPage}
      onPageClick={onPageChange}
    />
  )
}
