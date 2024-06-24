'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useOnLoadBoardNoticeDetail } from '@/client/store/home/hook'
import BoardDetail from './BoardDetail'

export default function NoticeBoardDetail({ id }: { id: string }) {
  const { payload, loading, error } = useOnLoadBoardNoticeDetail({
    notifyId: id,
  })
  // @Language 'common'
  const { t } = useTranslation()

  const title = payload.title || ''
  let date = ''
  if (payload.registDate) {
    date = payload.registDate.split('T')[0]
  }
  const html = payload.content || '<div></div>'

  return (
    <BoardDetail
      backLabel={t('t325')}
      title={title}
      date={date}
      htmlContents={html}
    />
  )
}
