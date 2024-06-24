import {
  LevelBookResponse,
  newLevelBooks,
} from '@/repository/client/achievement/level-books'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: LevelBookResponse
}

type Action = {
  setLevelBooks: (payload?: LevelBookResponse) => void
}

export type LevelBooksState = {
  levelBooks: State & {
    action: Action
  }
}

export const createSliceLevelBooksState: SliceStoreCreator<LevelBooksState> = (
  set
) => ({
  levelBooks: {
    payload: newLevelBooks(),
    action: {
      setLevelBooks: (payload) =>
        set((state) => {
          if (payload) {
            state.achieve.levelBooks.payload = payload
          }
        }),
    },
  },
})
