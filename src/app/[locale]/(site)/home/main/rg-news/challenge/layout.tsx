import SITE_PATH from '@/app/site-path'
import React from 'react'
import RgNewsPostBoard from '@/ui/modules/home-rg-news-components/RgNewsPostBoard'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const post = [
    {
      id: '202302',
      title: '2023년 하반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202302`,
    },
    {
      id: '202301',
      title: '2023년 상반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202301`,
    },
    {
      id: '202403',
      title: '2024년도 3월 신규도서',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/2023`,
    },
  ]

  return <RgNewsPostBoard post={post}>{children}</RgNewsPostBoard>
}
