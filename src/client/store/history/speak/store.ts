import {
  SpeakingReportResponse,
  newSpeakingReport,
} from '@/repository/client/history/speaking-report'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    range: 7 | 14 | 30 | 0
    startDate: { year: number; month: number; day: number }
    endDate: { year: number; month: number; day: number }
    status: string
  }
  payload: SpeakingReportResponse
}

type Action = {
  setSpeakHistory: (
    option?: {
      range: 7 | 14 | 30 | 0
      startDate: { year: number; month: number; day: number }
      endDate: { year: number; month: number; day: number }
      status: string
    },
    payload?: SpeakingReportResponse
  ) => void
}

export type SpeakHistoryState = {
  speak: State & {
    action: Action
  }
}

export const createSliceSpeakHistoryState: SliceStoreCreator<
  SpeakHistoryState
> = (set) => ({
  speak: {
    option: {
      range: 0,
      startDate: {
        year: 2024,
        month: 1,
        day: 1,
      },
      endDate: {
        year: 2024,
        month: 1,
        day: 1,
      },
      status: 'All',
    },
    payload: newSpeakingReport(),
    action: {
      setSpeakHistory: (option, payload) =>
        set((state) => {
          if (option) {
            state.history.speak.option = option
          }
          if (payload) {
            state.history.speak.payload = payload
          }
        }),
    },
  },
})
