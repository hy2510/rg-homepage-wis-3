import { useRootCreateStore } from '../../store'

export const useLibrarySeriesAction = () => {
  return useRootCreateStore((state) => state.library.series.action)
}

export const useLibrarySeries = () => {
  return useRootCreateStore((state) => state.library.series)
}
