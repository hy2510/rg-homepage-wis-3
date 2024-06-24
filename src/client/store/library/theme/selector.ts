import { useRootCreateStore } from '../../store'

export const useLibraryThemeAction = () => {
  return useRootCreateStore((state) => state.library.theme.action)
}

export const useLibraryTheme = () => {
  return useRootCreateStore((state) => state.library.theme)
}
