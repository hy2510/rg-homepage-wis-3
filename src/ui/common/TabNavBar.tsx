import { Nav, NavItem } from './common-components'

export interface NavBarItem {
  label: string
  active: boolean
}

export default function TabNavBar({
  items,
  onItemClick,
  isFillItems,
}: {
  items: NavBarItem[]
  onItemClick?: (index: number, label: string) => void
  isFillItems?: boolean
}) {
  const width = isFillItems ? '100%' : undefined
  return (
    <Nav>
      {items.map((item, i) => {
        return (
          <NavItem
            key={`nav_${item.label}_${i}`}
            active={item.active}
            onClick={() => {
              if (!item.active) {
                onItemClick && onItemClick(i, item.label)
              }
            }}
            width={width}>
            {item.label}
          </NavItem>
        )
      })}
    </Nav>
  )
}
