import SITE_PATH from '@/app/site-path'
import React from 'react'
import RgNewsPostBoard from '@/ui/modules/home-rg-news-components/RgNewsPostBoard'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const post = [
    {
      id: '202406',
      title: '2024년 6월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202406`,
    },
    {
      id: '202405',
      title: '2024년 5월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202405`,
    },
    {
      id: '202404',
      title: '2024년 4월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202404`,
    },
    {
      id: '202403',
      title: '2024년 3월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202403`,
    },
    {
      id: '202402',
      title: '2024년 2월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202402`,
    },
    {
      id: '202401',
      title: '2024년 1월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202401`,
    },
    {
      id: '202312',
      title: '2023년 12월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202312`,
    },
    {
      id: '202311',
      title: '2023년 11월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202311`,
    },
    {
      id: '202310',
      title: '2023년 10월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202310`,
    },
    {
      id: '202309',
      title: '2023년 9월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202309`,
    },
    {
      id: '202308',
      title: '2023년 8월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202308`,
    },
    {
      id: '202307',
      title: '2023년 7월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202307`,
    },
    {
      id: '202306',
      title: '2023년 6월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202306`,
    },
    {
      id: '202305',
      title: '2023년 5월 신규 콘텐츠',
      url: `${SITE_PATH.HOME.NEW_CONTENTS}/202305`,
    },
  ]

  return <RgNewsPostBoard post={post}>{children}</RgNewsPostBoard>
}
