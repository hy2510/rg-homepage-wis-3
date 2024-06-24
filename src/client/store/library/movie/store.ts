import {
  SearchMovieBookResponse,
  newSearchMovie,
} from '@/repository/client/library/search/search-movie'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    level: string
    page: number
  }
  payload: SearchMovieBookResponse
}

type Action = {
  setLibraryMovie: (
    option?: {
      level: string
      page: number
    },
    payload?: SearchMovieBookResponse,
  ) => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
}

export type MovieBookState = {
  movieBook: State & {
    action: Action
  }
}

export const createSliceMovieBookState: SliceStoreCreator<MovieBookState> = (
  set,
) => ({
  movieBook: {
    option: {
      level: '',
      page: 1,
    },
    payload: newSearchMovie(),
    action: {
      setLibraryMovie: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.movieBook.option = option
          }
          if (payload) {
            state.library.movieBook.payload = payload
          }
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.movieBook.payload.book =
            state.library.movieBook.payload.book.map((book) => {
              if (levelRoundIdsSet.has(book.levelRoundId)) {
                return { ...book, addYn: !isAdd }
              } else {
                return book
              }
            })
        }),
    },
  },
})
