import { useRootCreateStore } from '../../store'

export const useLibraryMovieAction = () => {
  return useRootCreateStore((state) => state.library.movieBook.action)
}

export const useLibraryMovie = () => {
  return useRootCreateStore((state) => state.library.movieBook)
}
