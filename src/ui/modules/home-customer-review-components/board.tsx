'use client'

// @Deprecate('Not Used')
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'board'

export function Board({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  return <div className={style.board}>{children}</div>
}

export function BoardHeader({
  txt_th1,
  txt_th2,
  txt_th3,
  txt_th4,
  txt_contents,
}: {
  txt_th1: string
  txt_th2: string
  txt_th3: string
  txt_th4: string
  txt_contents?: string
}) {
  const style = useStyle(STYLE_ID)
  const [viewContents, _viewContents] = useState(false)

  return (
    <div className={style.board_header}>
      <div className={style.column}>{txt_th1}</div>
      <div className={style.column}>{txt_th2}</div>
      <div className={style.column}>{txt_th3}</div>
      <div className={style.column}>{txt_th4}</div>
    </div>
  )
}

export function BoardItem({
  txt_td1,
  txt_td2,
  txt_td3,
  txt_td4,
  href,
}: {
  txt_td1: string
  txt_td2: string
  txt_td3: string
  txt_td4: string
  href?: string
}) {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.board_item}>
        <div className={style.column}>{txt_td1}</div>
        <div className={style.column}>
          <Link href={href ? href : ''}>{txt_td2}</Link>
        </div>
        <div className={style.column}>{txt_td3}</div>
        <div className={style.column}>{txt_td4}</div>
      </div>
    </>
  )
}
