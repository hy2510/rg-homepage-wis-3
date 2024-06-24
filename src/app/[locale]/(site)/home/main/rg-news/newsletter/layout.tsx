import SITE_PATH from '@/app/site-path'
import React from 'react'
import RgNewsPostBoard from '@/ui/modules/home-rg-news-components/RgNewsPostBoard'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const post = [
    {
      id: 'newsletter_vol17',
      title: '2024년 5월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol17`,
    },
    {
      id: 'newsletter_vol16',
      title: '2024년 4월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol16`,
    },
    {
      id: 'newsletter_vol15',
      title: '2024년 3월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol15`,
    },
    {
      id: 'newsletter_vol14',
      title: '2024년 2월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol14`,
    },
    {
      id: 'newsletter_vol13',
      title: '2024년 1월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol13`,
    },
    {
      id: 'newsletter_vol12',
      title: '2023년 12월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol12`,
    },
    {
      id: 'newsletter_vol11',
      title: '2023년 11월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol11`,
    },
    {
      id: 'newsletter_vol10',
      title: '2023년 10월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol10`,
    },
    {
      id: 'newsletter_vol09',
      title: '2023년 9월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol09`,
    },
    {
      id: 'newsletter_vol08',
      title: '2023년 8월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol08`,
    },
    {
      id: 'newsletter_vol07',
      title: '2023년 7월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol07`,
    },
    {
      id: 'newsletter_vol06',
      title: '2023년 6월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol06`,
    },
    {
      id: 'newsletter_vol05',
      title: '2023년 5월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol05`,
    },
    {
      id: 'newsletter_vol04',
      title: '2023년 4월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol04`,
    },
    {
      id: 'newsletter_vol03',
      title: '2023년 3월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol03`,
    },
    {
      id: 'newsletter_vol02',
      title: '2023년 2월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol02`,
    },
    {
      id: 'newsletter_vol01',
      title: '2023년 1월 뉴스레터',
      url: `${SITE_PATH.HOME.NEWS_LETTER}/newsletter_vol01`,
    },
  ]

  return <RgNewsPostBoard post={post}>{children}</RgNewsPostBoard>
}
