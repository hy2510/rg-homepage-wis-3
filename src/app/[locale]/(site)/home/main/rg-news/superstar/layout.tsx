import SITE_PATH from '@/app/site-path'
import React from 'react'
import RgNewsPostBoard from '@/ui/modules/home-rg-news-components/RgNewsPostBoard'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const post = [
    {
      id: '2022',
      title: '2022년 슈퍼스타 선발대회',
      url: `${SITE_PATH.HOME.EVENT_SUPERSTAR}/2022`,
    },
    {
      id: '2021',
      title: '2021년 슈퍼스타 선발대회',
      url: `${SITE_PATH.HOME.EVENT_SUPERSTAR}/2021`,
    },
    {
      id: '2020',
      title: '2020년 슈퍼스타 선발대회',
      url: `${SITE_PATH.HOME.EVENT_SUPERSTAR}/2020`,
    },
    {
      id: '2019',
      title: '2019년 슈퍼스타 선발대회',
      url: `${SITE_PATH.HOME.EVENT_SUPERSTAR}/2019`,
    },
  ]

  return <RgNewsPostBoard post={post}>{children}</RgNewsPostBoard>
}
