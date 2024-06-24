import { useRootCreateStore } from '../../store'

export const useLibraryPreKLevelAction = () => {
  return useRootCreateStore((state) => state.library.levelPreK.action)
}

export const useLibraryLevelPreK = () => {
  return useRootCreateStore((state) => state.library.levelPreK)
}
