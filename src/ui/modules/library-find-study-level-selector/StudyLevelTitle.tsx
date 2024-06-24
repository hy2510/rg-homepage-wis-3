import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'study_level_selector'

export default function StudyLevelTitle({
  level,
  onClick,
}: {
  level?: string
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.level_select_button} onClick={onClick}>
      {level}
      <span className={style.arrow_icon}></span>
    </div>
  )
}
