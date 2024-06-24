import {
  BookInfoResponse,
  newBookInfo,
} from '@/repository/client/library/book-info/book-info'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    status: string
  }
  payload: BookInfoResponse
}

type Action = {
  setBookDetail: (
    option?: { status: never },
    payload?: BookInfoResponse,
  ) => void
  setFavorite: (isFavorite: boolean) => void
  //   setTodo: (isTodo: boolean) => void
  resetBookDetail: () => void
}

export type BookDetailState = {
  detail: State & {
    action: Action
  }
}

export const createSliceBookDetailState: SliceStoreCreator<BookDetailState> = (
  set,
) => ({
  detail: {
    option: {
      status: '',
    },
    payload: newBookInfo(),
    action: {
      setBookDetail: (option, payload) =>
        set((state) => {
          if (option) {
            state.bookinfo.detail.option = option
          }
          if (payload) {
            state.bookinfo.detail.payload = payload
          }
        }),
      setFavorite: (isFavorite) =>
        set((state) => {
          state.bookinfo.detail.payload.bookMarkYn = isFavorite
        }),
      resetBookDetail: () =>
        set((state) => {
          state.bookinfo.detail.payload = newBookInfo()
        }),
    },
  },
})
