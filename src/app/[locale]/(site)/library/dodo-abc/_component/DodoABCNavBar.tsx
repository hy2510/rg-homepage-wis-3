import SITE_PATH from '@/app/site-path'
import Link from 'next/link'
import { Nav, NavItem } from '@/ui/common/common-components'

export default function DodoABCNavBar({
  active,
}: {
  active: 'study' | 'game' | 'song'
}) {
  return (
    <Nav>
      <Link href={SITE_PATH.LIBRARY.DODO_ABC_STUDY}>
        <NavItem active={active === 'study'}>{'Study'}</NavItem>
      </Link>
      <Link href={SITE_PATH.LIBRARY.DODO_ABC_GAME}>
        <NavItem active={active === 'game'}>{`Game`}</NavItem>
      </Link>
      <Link href={SITE_PATH.LIBRARY.DODO_ABC_SONG}>
        <NavItem active={active === 'song'}>{`Song & Chant`}</NavItem>
      </Link>
    </Nav>
  )
}
