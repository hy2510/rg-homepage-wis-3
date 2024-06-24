import {
  ReadingKingTrophyResponse,
  newReadingKingTrophy,
} from '@/repository/client/achievement/readingking-trophy'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: ReadingKingTrophyResponse
}

type Action = {
  setReadingKingTrophy: (payload?: ReadingKingTrophyResponse) => void
}

export type ReadingKingTrophyState = {
  readingkingTrophy: State & {
    action: Action
  }
}

export const createSliceReadingKingTrophyState: SliceStoreCreator<
  ReadingKingTrophyState
> = (set) => ({
  readingkingTrophy: {
    payload: newReadingKingTrophy(),
    action: {
      setReadingKingTrophy: (payload) =>
        set((state) => {
          if (payload) {
            state.achieve.readingkingTrophy.payload = payload
          }
        }),
    },
  },
})
