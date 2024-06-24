import {
  StudyReportResponse,
  newStudyReport,
} from '@/repository/client/history/study-report'
import { SliceStoreCreator } from '../../store'

type State = {
  simple: {
    option: {
      range: 7 | 14 | 30 | 0
      status: string
    }
    payload: StudyReportResponse
  }
  basic: {
    option: {
      startDate: { year: number; month: number; day: number }
      endDate: { year: number; month: number; day: number }
      keyword?: string
      status: string
    }
    payload: StudyReportResponse
  }
}

type Action = {
  setStudyHistorySimple: (
    option?: {
      range: 7 | 14 | 30 | 0
      status: string
    },
    payload?: StudyReportResponse
  ) => void
  setStudyHistoryBasic: (
    option?: {
      startDate: { year: number; month: number; day: number }
      endDate: { year: number; month: number; day: number }
      keyword?: string
      status: string
    },
    payload?: StudyReportResponse
  ) => void
}

export type StudyHistoryState = {
  study: State & {
    action: Action
  }
}

export const createSliceStudyHistoryState: SliceStoreCreator<
  StudyHistoryState
> = (set) => ({
  study: {
    simple: {
      option: {
        range: 0,
        status: 'All',
      },
      payload: newStudyReport(),
    },
    basic: {
      option: {
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
      payload: newStudyReport(),
    },
    action: {
      setStudyHistorySimple: (option, payload) =>
        set((state) => {
          if (option) {
            state.history.study.simple.option = option
          }
          if (payload) {
            state.history.study.simple.payload = payload
          }
        }),
      setStudyHistoryBasic: (option, payload) =>
        set((state) => {
          if (option) {
            state.history.study.basic.option = option
          }
          if (payload) {
            state.history.study.basic.payload = payload
          }
        }),
    },
  },
})
