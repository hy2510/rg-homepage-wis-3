import { newSearchLevel } from '@/repository/client/library/search/search-level'
import { SearchBookResponse } from '@/repository/client/library/search/search-theme'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    level: string
    bookType: string
    title: string
    image: string
    page: number
  }
  payload: SearchBookResponse
}

type Action = {
  setSeriesSearch: (
    option?: {
      level: string
      bookType: string
      title: string
      image: string
      page: number
    },
    payload?: SearchBookResponse,
  ) => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
}
export type SeriesState = {
  series: State & {
    action: Action
  }
}

export const createSliceSeriesState: SliceStoreCreator<SeriesState> = (
  set,
) => ({
  series: {
    option: {
      level: '',
      bookType: '',
      title: '',
      image: '',
      page: 1,
    },
    payload: newSearchLevel(),
    action: {
      setSeriesSearch: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.series.option = option
          }
          if (payload) {
            state.library.series.payload = payload
          }
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.series.payload.book =
            state.library.series.payload.book.map((book) => {
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
