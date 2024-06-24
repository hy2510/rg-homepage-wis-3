import {
  RankingReadingkingResponse,
  newRankingReadingking,
} from '@/repository/client/ranking/readingking'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    eventId: string
  }
  payload: RankingReadingkingResponse
}

type Action = {
  setReadingking: (
    option?: {
      eventId: string
    },
    payload?: RankingReadingkingResponse
  ) => void
}

export type ReadingkingState = {
  readingking: State & {
    action: Action
  }
}

export const createSliceReadingkingState: SliceStoreCreator<
  ReadingkingState
> = (set) => ({
  readingking: {
    option: {
      eventId: '',
    },
    payload: newRankingReadingking(),
    action: {
      setReadingking: (option, payload) =>
        set((state) => {
          if (option) {
            state.ranking.readingking.option = option
          }
          if (payload) {
            state.ranking.readingking.payload = payload
          }
        }),
    },
  },
})
