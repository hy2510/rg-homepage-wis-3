import { useRootCreateStore } from '../../store'

export const useLibraryNewBookAction = () => {
  return useRootCreateStore((state) => state.library.newBook.action)
}

export const useLibraryNewBook = () => {
  return useRootCreateStore((state) => state.library.newBook)
}
