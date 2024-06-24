import {
  NewBooksResponse,
  newNewBooks,
} from '@/repository/client/library/new-books'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    year: number
    month: number
  }
  payload: NewBooksResponse
}

type Action = {
  setNewBooks: (
    option?: { year: number; month: number },
    payload?: NewBooksResponse,
  ) => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
}

export type NewBookState = {
  newBook: State & {
    action: Action
  }
}

export const createSliceNewBookState: SliceStoreCreator<NewBookState> = (
  set,
) => ({
  newBook: {
    option: {
      year: 0,
      month: 0,
    },
    payload: newNewBooks(),
    action: {
      setNewBooks: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.newBook.option = option
          }
          if (payload) {
            state.library.newBook.payload = payload
          }
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.newBook.payload.EB =
            state.library.newBook.payload.EB.map((book) => {
              if (levelRoundIdsSet.has(book.levelRoundId)) {
                return { ...book, addYn: !isAdd }
              } else {
                return book
              }
            })
          state.library.newBook.payload.PB =
            state.library.newBook.payload.PB.map((book) => {
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
