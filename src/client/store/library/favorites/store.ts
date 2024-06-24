import {
  FavoriteResponse,
  newFavorite,
} from '@/repository/client/library/favorite/favorite'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    status: string
    page: number
  }
  count: number
  payload: FavoriteResponse
}

type Action = {
  setFavorite: (
    option?: { page: number; status: string },
    payload?: FavoriteResponse,
  ) => void
  setFavoriteCount: (count: number) => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
}

export type FavoriteState = {
  favorites: State & {
    action: Action
  }
}

export const createSliceFavoriteState: SliceStoreCreator<FavoriteState> = (
  set,
) => ({
  favorites: {
    option: {
      status: 'All',
      page: 1,
    },
    count: 0,
    payload: newFavorite(),
    action: {
      setFavorite: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.favorites.option = option
          }
          if (payload) {
            state.library.favorites.payload = payload
            state.library.favorites.count = payload.page.totalRecords
          }
        }),
      setFavoriteCount: (count) =>
        set((state) => {
          state.library.favorites.count = count
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.favorites.payload.book =
            state.library.favorites.payload.book.map((book) => {
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
