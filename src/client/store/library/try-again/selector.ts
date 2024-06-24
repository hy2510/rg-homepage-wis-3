import { useRootCreateStore } from '../../store'

export const useLibraryTryAgainAction = () => {
  return useRootCreateStore((state) => state.library.tryAgain.action)
}

export const useLibraryTryAgain = () => {
  return useRootCreateStore((state) => state.library.tryAgain)
}
