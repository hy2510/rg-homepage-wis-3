import { SearchThemeCategory } from '@/repository/client/object/search-theme-category'
import { ThemeList, ThemeListItem } from './theme-list'

export default function ThemeListView({
  themes,
  onThemeClick,
}: {
  themes: SearchThemeCategory[]
  onThemeClick?: (themeItem: SearchThemeCategory) => void
}) {
  return (
    <ThemeList>
      {themes.map((theme) => {
        return (
          <ThemeListItem
            key={theme.code}
            title={theme.name}
            themeImgSrc={theme.imagePath}
            onClick={() => {
              onThemeClick && onThemeClick(theme)
            }}
          />
        )
      })}
    </ThemeList>
  )
}
