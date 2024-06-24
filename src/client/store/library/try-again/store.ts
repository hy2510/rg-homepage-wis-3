import { newSearchLevel } from '@/repository/client/library/search/search-level'
import { SearchTryAgainResponse } from '@/repository/client/library/search/search-try-again'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    page: number
  }
  payload: SearchTryAgainResponse
}

type Action = {
  setTryAgain: (
    option?: { page: number },
    payload?: SearchTryAgainResponse,
  ) => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
}

export type TryAgainState = {
  tryAgain: State & {
    action: Action
  }
}

export const createSliceTryAgainState: SliceStoreCreator<TryAgainState> = (
  set,
) => ({
  tryAgain: {
    option: {
      page: 1,
    },
    payload: newSearchLevel(),
    action: {
      setTryAgain: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.tryAgain.option = option
          }
          if (payload) {
            state.library.tryAgain.payload = payload
          }
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.tryAgain.payload.book =
            state.library.tryAgain.payload.book.map((book) => {
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
