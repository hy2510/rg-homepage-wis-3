import Link from 'next/link'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'nav_bar_home_rg_membership_components'

export function NavBar({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  return <div className={style.nav_bar}>{children}</div>
}

export function NavItem({
  children,
  active,
  onClick,
  href,
}: {
  children?: ReactNode
  active?: boolean
  onClick?: () => void
  href?: string
}) {
  const style = useStyle(STYLE_ID)

  return (
    <Link href={href ? href : '/'}>
      <div
        className={`${style.nav_item} ${active ? style.active : null}`}
        onClick={onClick}>
        {children}
      </div>
    </Link>
  )
}
