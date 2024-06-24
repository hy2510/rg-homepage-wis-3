import SITE_PATH from '@/app/site-path'
import Link from 'next/link'
import { Nav, NavItem } from '@/ui/common/common-components'

export default function AssignmentNavBar({
  active,
}: {
  active: 'to-do' | 'try-again' | 'favorite'
}) {
  return (
    <Nav>
      <Link href={SITE_PATH.LIBRARY.TODO}>
        <NavItem active={active === 'to-do'}>To-Do</NavItem>
      </Link>
      <Link href={SITE_PATH.LIBRARY.TRY_AGAIN}>
        <NavItem active={active === 'try-again'}>Try Again</NavItem>
      </Link>
      <Link href={SITE_PATH.LIBRARY.FAVORITE}>
        <NavItem active={active === 'favorite'}>Favorite</NavItem>
      </Link>
    </Nav>
  )
}
