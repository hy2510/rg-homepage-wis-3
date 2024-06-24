// @Deprecate('Not Used')
import { Dropdown, DropdownItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import { SetFilter } from '../library-set-fliter/set-fliter'

const STYLE_ID = 'study_level_selector'

export function StudyLevelSelector({
  prek,
  level,
  onClick,
}: {
  prek?: boolean
  level?: string
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)
  return (
    <div className={style.study_level_selector}>
      {prek && (
        <Dropdown title={`모든 단계`}>
          <DropdownItem>모든 단계</DropdownItem>
          <DropdownItem>단계 1. 알파벳 학습</DropdownItem>
          <DropdownItem>단계 2. 파닉스 학습</DropdownItem>
          <DropdownItem>단계 3. 단어 학습</DropdownItem>
          <DropdownItem>단계 4. 스토리 읽기</DropdownItem>
        </Dropdown>
      )}
      {level && (
        <div className={style.level_select_button} onClick={onClick}>
          {level}
          <span className={style.arrow_icon}></span>
        </div>
      )}
      <SetFilter />
    </div>
  )
}
