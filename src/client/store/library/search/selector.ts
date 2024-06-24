import { useRootCreateStore } from '../../store'

export const useLibrarySearchAction = () => {
  return useRootCreateStore((state) => state.library.search.action)
}

export const useLibrarySearch = () => {
  return useRootCreateStore((state) => state.library.search)
}
