import { useRootCreateStore } from '../../store'

export const useLibraryHomeAction = () => {
  return useRootCreateStore((state) => state.library.homeBook.action)
}

export const useLibraryHome = () => {
  return useRootCreateStore((state) => state.library.homeBook)
}
