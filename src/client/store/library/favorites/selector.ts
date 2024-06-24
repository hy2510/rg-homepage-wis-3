import { useRootCreateStore } from '../../store'

export const useLibraryFavoriteAction = () => {
  return useRootCreateStore((state) => state.library.favorites.action)
}

export const useLibraryFavorite = () => {
  return useRootCreateStore((state) => state.library.favorites)
}
