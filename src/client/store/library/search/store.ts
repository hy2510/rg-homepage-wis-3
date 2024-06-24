import {
  SearchLevelBookResponse,
  newSearchLevel,
} from '@/repository/client/library/search/search-level'
import { SliceStoreCreator } from '../../store'

type State = {
  keyword: string
  EB: {
    option: {
      page: number
    }
    payload: SearchLevelBookResponse
  }
  PB: {
    option: {
      page: number
    }
    payload: SearchLevelBookResponse
  }
}

type Action = {
  setKeywordSearch: (
    bookType: string,
    option?: { keyword?: string; page: number },
    payload?: SearchLevelBookResponse,
  ) => void
  setClearKeywordSearch: () => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
}

export type SearchBookState = {
  search: State & {
    action: Action
  }
}

export const createSliceSearchBookState: SliceStoreCreator<SearchBookState> = (
  set,
) => ({
  search: {
    keyword: '',
    EB: {
      option: {
        page: 1,
      },
      payload: newSearchLevel(),
    },
    PB: {
      option: {
        page: 1,
      },
      payload: newSearchLevel(),
    },
    action: {
      setKeywordSearch: (bookType, option, payload) =>
        set((state) => {
          const targetBookType = bookType as 'EB' | 'PB'
          if (option) {
            if (option.keyword) {
              state.library.search.keyword = option.keyword
            }
            state.library.search[targetBookType].option.page = option.page
          }
          if (payload) {
            const books =
              payload.page.page === 1
                ? [...payload.book]
                : [
                    ...state.library.search[targetBookType].payload.book,
                    ...payload.book,
                  ]
            state.library.search[targetBookType].payload.book = books
            state.library.search[targetBookType].payload.page = payload.page
          }
        }),
      setClearKeywordSearch: () =>
        set((state) => {
          state.library.search.keyword = ''
          state.library.search.EB = {
            option: {
              page: 1,
            },
            payload: newSearchLevel(),
          }
          state.library.search.PB = {
            option: {
              page: 1,
            },
            payload: newSearchLevel(),
          }
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.search.EB.payload.book =
            state.library.search.EB.payload.book.map((book) => {
              if (levelRoundIdsSet.has(book.levelRoundId)) {
                return { ...book, addYn: !isAdd }
              } else {
                return book
              }
            })
          state.library.search.PB.payload.book =
            state.library.search.PB.payload.book.map((book) => {
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
