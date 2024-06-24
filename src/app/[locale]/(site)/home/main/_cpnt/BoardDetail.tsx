'use client'

import { useRouter } from 'next/navigation'
import { BackLink, Margin } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_rg_news_post'

export default function BoardDetail({
  backLabel,
  backLink,
  title,
  date,
  htmlContents,
}: {
  backLabel: string
  backLink?: string
  title: string
  date: string
  htmlContents: string
}) {
  const style = useStyle(STYLE_ID)
  const router = useRouter()

  return (
    <main className="container compact">
      <BackLink
        largeFont
        colorWhite
        onClick={() => {
          if (backLink) {
            router.push(backLink)
          } else {
            router.back()
          }
        }}>
        {backLabel}
      </BackLink>
      <Margin height={30} />
      <div className={style.rg_news_post}>
        <div className={style.row_1}>
          <div className={style.txt_1}>{title}</div>
          <div className={style.txt_2}>{date}</div>
        </div>
        <div className={style.row_2}>
          <div dangerouslySetInnerHTML={{ __html: htmlContents }} />
        </div>
      </div>
    </main>
  )
}
