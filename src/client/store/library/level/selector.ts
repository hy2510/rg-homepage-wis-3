import { useRootCreateStore } from '../../store'

export const useLibraryLevelAction = () => {
  return useRootCreateStore((state) => state.library.levelBook.action)
}

export const useLibraryLevel = () => {
  return useRootCreateStore((state) => state.library.levelBook)
}
