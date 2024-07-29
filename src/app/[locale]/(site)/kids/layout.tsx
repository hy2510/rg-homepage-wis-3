'use client'

import { useStyle } from '@/ui/context/StyleContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const STYLE_ID = 'page_kids_prek'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const style = useStyle(STYLE_ID)
  const pathname = usePathname()
  
  const dodoAbc = pathname.indexOf('dodo-abc') != -1
  const preK = pathname.indexOf('prek') != -1

  return (
    <>
      <div className={style.kids_top}>
        <div className={style.kids_top_nav}>
          <Link href={'/kids/dodo-abc'}>
            <div className={`${style.nav_item} ${dodoAbc && style.active}`}>DODO ABC</div>
          </Link>
          <Link href={'/kids/prek'}>
            <div className={`${style.nav_item} ${preK && style.active}`}>PRE K</div>
          </Link>
        </div>
      </div>
      {children}
    </>
  )
}