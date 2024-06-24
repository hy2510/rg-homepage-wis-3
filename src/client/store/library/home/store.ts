import {
  CategorySeriesResponse,
  newCategorySeries,
} from '@/repository/client/library/category/category-series'
import {
  CategoryThemeResponse,
  newCategoryTheme,
} from '@/repository/client/library/category/category-theme'
import {
  SearchDodoABCBookResponse,
  newSearchDodoABC,
} from '@/repository/client/library/search/search-dodoabc'
import {
  SearchLevelBookResponse,
  newSearchLevel,
} from '@/repository/client/library/search/search-level'
import {
  SearchPreKBookResponse,
  newSearchPK,
} from '@/repository/client/library/search/search-pk'
import { SliceStoreCreator } from '../../store'

interface State {
  level: string
  bookType: string
  pkType: string
  PK: {
    option: {
      status: string
      activity: string
    }
    payload: SearchPreKBookResponse
  }
  Dodo: {
    option: {
      status: string
      activity: string
    }
    payload: SearchDodoABCBookResponse
  }
  EBPB: {
    option: {
      page: number
    }
    payload: SearchLevelBookResponse
  }
  series: {
    payload: CategorySeriesResponse
  }
  theme: {
    payload: CategoryThemeResponse
  }
  mode: string
}
interface Action {
  setLibraryHomeEBPB: (
    option?: {
      level: string
      bookType: string
      page: number
    },
    payload?: [
      SearchLevelBookResponse,
      CategoryThemeResponse,
      CategorySeriesResponse,
    ],
  ) => void
  setLibraryLevelBook: (
    option?: {
      level: string
      bookType: string
      page: number
    },
    payload?: SearchLevelBookResponse,
  ) => void
  setLibraryPreKBook: (
    option?: {
      activity: string
      status: string
    },
    payload?: SearchPreKBookResponse,
  ) => void
  setLibraryDodoAbcBook: (
    option?: {
      activity: string
      status: string
    },
    payload?: SearchDodoABCBookResponse,
  ) => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
  clearLibraryPreKBook: () => void
  setLibraryPKType: (pkType: string) => void
  updateMode: (mode: string) => void
}

export interface HomeState {
  homeBook: State & {
    action: Action
  }
}

export const createSliceHomeState: SliceStoreCreator<HomeState> = (set) => ({
  homeBook: {
    level: '',
    bookType: '',
    pkType: '',
    PK: {
      option: {
        activity: 'Alphabet',
        status: 'All',
      },
      payload: newSearchPK(),
    },
    Dodo: {
      option: {
        activity: 'Study-Alphabet',
        status: 'All',
      },
      payload: newSearchDodoABC(),
    },
    EBPB: {
      option: {
        page: 1,
      },
      payload: newSearchLevel(),
    },
    series: {
      payload: newCategorySeries(),
    },
    theme: {
      payload: newCategoryTheme(),
    },
    mode: '',
    action: {
      setLibraryHomeEBPB: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.homeBook.level = option.level
            let bookType: 'EB' | 'PB' = 'EB'
            if (option.bookType === 'PB') {
              bookType = option.bookType
            }
            state.library.homeBook.bookType = bookType
            state.library.homeBook.EBPB.option.page = option.page
          }
          if (payload) {
            state.library.homeBook.EBPB.payload = payload[0]
            state.library.homeBook.theme.payload = payload[1]
            state.library.homeBook.series.payload = payload[2]
          }
        }),
      setLibraryPreKBook: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.homeBook.PK.option = option
          }
          if (payload) {
            state.library.homeBook.PK.payload = payload
          }
        }),
      setLibraryDodoAbcBook: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.homeBook.Dodo.option = option
          }
          if (payload) {
            state.library.homeBook.Dodo.payload = payload
          }
        }),
      clearLibraryPreKBook: () =>
        set((state) => {
          state.library.homeBook.PK.payload = newSearchPK()
        }),
      setLibraryLevelBook: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.homeBook.level = option.level
            let bookType: 'EB' | 'PB' = 'EB'
            if (option.bookType === 'PB') {
              bookType = option.bookType
            }
            state.library.homeBook.bookType = bookType
            state.library.homeBook.EBPB.option.page = option.page
          }
          if (payload) {
            state.library.homeBook.EBPB.payload = payload
          }
        }),
      setLibraryPKType: (pkType) =>
        set((state) => {
          state.library.homeBook.pkType = pkType
        }),
      updateMode: (mode) =>
        set((state) => {
          state.library.homeBook.mode = mode
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.homeBook.EBPB.payload.book =
            state.library.homeBook.EBPB.payload.book.map((book) => {
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
