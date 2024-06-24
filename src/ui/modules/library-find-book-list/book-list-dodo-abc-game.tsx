'use client'

import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'library_find_book_list'

// 학습메인 > 사용자의 학습레벨의 도서 리스트
export function DodoABCGameBookList({
  count,
  children,
}: {
  count?: number
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className="flex dir-col gap-m">
      <div className={style.book_list}>
        <div className={style.row_b}>{children}</div>
      </div>
    </div>
  )
}
