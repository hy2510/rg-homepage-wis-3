import {
  SearchLevelBookResponse,
  newSearchLevel,
} from '@/repository/client/library/search/search-level'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    level: string
    bookType: string
    page: number
  }
  payload: SearchLevelBookResponse
}

type Action = {
  setLibraryLevel: (
    option?: {
      level: string
      bookType: string
      page: number
    },
    payload?: SearchLevelBookResponse,
  ) => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
}

export type LevelBookState = {
  levelBook: State & {
    action: Action
  }
}

export const createSliceLevelBookState: SliceStoreCreator<LevelBookState> = (
  set,
) => ({
  levelBook: {
    option: {
      level: '',
      bookType: '',
      page: 1,
    },
    payload: newSearchLevel(),
    action: {
      setLibraryLevel: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.levelBook.option = option
          }
          if (payload) {
            state.library.levelBook.payload = payload
          }
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.levelBook.payload.book =
            state.library.levelBook.payload.book.map((book) => {
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
