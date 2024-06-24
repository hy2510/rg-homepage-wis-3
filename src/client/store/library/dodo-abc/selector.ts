import { useRootCreateStore } from '../../store'

export const useLibraryDodoAbcLevelAction = () => {
  return useRootCreateStore((state) => state.library.levelDodo.action)
}

export const useLibraryDodoAbcLevel = () => {
  return useRootCreateStore((state) => state.library.levelDodo)
}
