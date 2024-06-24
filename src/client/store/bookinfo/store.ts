import { SliceStoreCreator } from '../store'
import { BookDetailState, createSliceBookDetailState } from './detail/store'

export type BookInfoState = {
  bookinfo: BookDetailState
}

export const createBookInfoStore: SliceStoreCreator<BookInfoState> = (...a) => {
  return {
    bookinfo: {
      ...createSliceBookDetailState(...a),
    },
  }
}
