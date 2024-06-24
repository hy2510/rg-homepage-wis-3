import { useRootCreateStore } from '../../store'

export const useLibraryFilterAction = () => {
  return useRootCreateStore((state) => state.library.filter.action)
}
export const useLibraryEbPbFilter = (type: 'EB' | 'PB') => {
  return useRootCreateStore((state) => state.library.filter[type])
}
export const useLibraryPKFilter = () => {
  return useRootCreateStore((state) => state.library.filter.PK)
}
export const useLibraryDodoFilter = () => {
  return useRootCreateStore((state) => state.library.filter.Dodo)
}
