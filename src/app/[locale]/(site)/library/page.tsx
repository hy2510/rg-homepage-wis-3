'use client'

import { useStyle } from '@/ui/context/StyleContext'
import { LibraryLoader } from './_mode/LibraryLoader'

const STYLE_ID = 'page_library'

export default function Page() {
  const style = useStyle(STYLE_ID)
  return (
    <main className={`${style.explore} ${style.pc}`}>
      <LibraryLoader />
    </main>
  )
}
