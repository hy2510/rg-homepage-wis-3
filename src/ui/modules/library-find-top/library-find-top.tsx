import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'library_find_top'

export function LibraryFindTop({
  title,
  imgSrc,
}: {
  title: string
  imgSrc?: string
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={style.library_find_top}
      // style={{ backgroundImage: `url("${imgSrc}")` }}
    >
      <div className={style.light_box}>{title}</div>
    </div>
  )
}
