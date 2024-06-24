import SITE_PATH from '@/app/site-path'
import React from 'react'
import RgNewsPostBoard from '@/ui/modules/home-rg-news-components/RgNewsPostBoard'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const post = [
    {
      id: '202303',
      title: '2023년 학습 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202303`,
    },
    {
      id: '202302',
      title: '2023하반기 영어독서왕대회 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202302`,
    },
    {
      id: '202301',
      title: '2023상반기 영어독서왕대회 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202301`,
    },

    {
      id: '202203',
      title: '2022년 학습 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202203`,
    },
    {
      id: '202202',
      title: '2022하반기 영어독서왕대회 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202202`,
    },
    {
      id: '202201',
      title: '2022상반기 영어독서왕대회 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202201`,
    },

    {
      id: '202103',
      title: '2021년 학습 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202103`,
    },
    {
      id: '202102',
      title: '2021하반기 영어독서왕대회 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202102`,
    },
    {
      id: '202101',
      title: '2021상반기 영어독서왕대회 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202101`,
    },

    {
      id: '202003',
      title: '2020년 학습 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202003`,
    },
    {
      id: '202002',
      title: '2020하반기 영어독서왕대회 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202002`,
    },
    {
      id: '202001',
      title: '2020상반기 영어독서왕대회 인포그래픽',
      url: `${SITE_PATH.HOME.INFOGRAPHIC}/202001`,
    },
  ]

  return <RgNewsPostBoard post={post}>{children}</RgNewsPostBoard>
}
