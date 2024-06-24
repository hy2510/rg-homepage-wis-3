import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'study_level_selector'
export default function StudyLevelBox({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)
  return <div className={style.study_level_selector}>{children}</div>
}
