import { Dropdown, DropdownItem } from '@/ui/common/common-components'

export type DropDownOption = {
  key: string
  label: string
}
export default function StudyLevelDropDown({
  currentItem,
  items,
  onItemClick,
}: {
  currentItem?: DropDownOption
  items?: DropDownOption[]
  onItemClick?: (key: string) => void
}) {
  const title = currentItem ? currentItem.label : ''
  const onItemClickListener = (key: string) => {
    onItemClick && onItemClick(key)
  }
  return (
    <Dropdown title={title}>
      {items?.map((item) => {
        return (
          <DropdownItem
            key={`${item.key}`}
            onClick={() => onItemClickListener(item.key)}>
            {item.label}
          </DropdownItem>
        )
      })}
    </Dropdown>
  )
}
