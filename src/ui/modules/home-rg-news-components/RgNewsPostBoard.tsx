'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Dropdown, DropdownItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'home_rg_news_post_board'

export default function RgNewsPostBoard({
  post,
  children,
}: {
  post: { title: string; id: string; url: string }[]
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  const path = usePathname()

  let currentIndex = -1
  post.forEach((p, i) => {
    if (path === p.url) {
      if (i !== currentIndex) {
        currentIndex = i
      }
    }
  })

  if (post.length === 0) {
    return <div>아직 도착한 소식이 없습니다.</div>
  }

  const title = currentIndex !== -1 ? post[currentIndex].title : ''
  const prevLinkUrl =
    currentIndex !== -1 && post.length - 1 > currentIndex
      ? post[currentIndex + 1].url
      : undefined
  const nextLinkUrl = currentIndex > 0 ? post[currentIndex - 1].url : undefined

  return (
    <div className={style.rg_news_post_board}>
      {/* 회차 선택 */}
      <div className={style.group_1}>
        <div className={style.btn_left}>
          {prevLinkUrl && (
            <Link href={prevLinkUrl}>
              <div className={'ico-arrow-left'} />
            </Link>
          )}
        </div>
        <div className={style.col_center}>
          <Dropdown title={title}>
            {post.map((a, i) => {
              return (
                <DropdownItem key={`dropdown-rg-news-${i}`}>
                  <Link href={a.url}>{a.title}</Link>
                </DropdownItem>
              )
            })}
          </Dropdown>
        </div>
        <div className={style.btn_right}>
          {nextLinkUrl && (
            <Link href={nextLinkUrl}>
              <div className={'ico-arrow-right'} />
            </Link>
          )}
        </div>
      </div>

      {/* 내용 */}
      <div className={style.group_2}>{children}</div>
    </div>
  )
}
