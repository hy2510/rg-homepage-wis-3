import {
  StudentHistoryListResponse,
  newStudentHistoryList,
} from '@/repository/client/student/student-history-list'
import { SliceStoreCreator } from '../../store'

type State = {
  defaultHistoryId: string
  payload: StudentHistoryListResponse
}

type Action = {
  setDefaultHistoryId: (studentHistoryId: string) => void
  setHistory: (payload?: StudentHistoryListResponse) => void
}

export type HistoryState = {
  history: State & {
    action: Action
  }
}

export const createSliceHistoryState: SliceStoreCreator<HistoryState> = (
  set
) => ({
  history: {
    defaultHistoryId: '',
    payload: newStudentHistoryList(),
    action: {
      setDefaultHistoryId: (studentHistoryId) =>
        set((state) => {
          state.student.history.defaultHistoryId = studentHistoryId
        }),
      setHistory: (payload) =>
        set((state) => {
          if (payload) {
            state.student.history.payload = payload
            if (payload.length >= 1) {
              state.student.history.defaultHistoryId =
                payload[0].studentHistoryId
            }
          }
        }),
    },
  },
})
