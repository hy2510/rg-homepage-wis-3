import {
  StudentDailyLearningResponse,
  newStudentDailyLearning,
} from '@/repository/client/student/student-daily-learning'
import { SliceStoreCreator } from '../../store'
import {
  StudentDailyLearningHistoryResponse,
  newStudentDailyLearningHistory,
} from '@/repository/client/student/student-daily-learning-history'
import { makeStudentDailyLearningHistory } from '@/repository/client/object/student-daily-learning-history'

type State = {
  payload: StudentDailyLearningResponse
  history: StudentDailyLearningHistoryResponse
}

type Action = {
  setDailyLearning: (payload?: StudentDailyLearningResponse) => void
  changeDailyLearning: (type: string, value: number) => void
  changeDailyLearningLevel: (level: string) => void
  setDailyLearningHistory: (
    payload?: StudentDailyLearningHistoryResponse
  ) => void
  addDailyLearningHistory: (date: string, type: string, value: number) => void
}

export type DailyLearningState = {
  dailyLearning: State & {
    action: Action
  }
}

export const createSliceDailyLearningState: SliceStoreCreator<
  DailyLearningState
> = (set) => ({
  dailyLearning: {
    payload: newStudentDailyLearning(),
    history: newStudentDailyLearningHistory(),
    action: {
      setDailyLearning: (payload) =>
        set((state) => {
          if (payload) {
            state.student.dailyLearning.payload = payload
          }
        }),
      changeDailyLearning: (type, value) =>
        set((state) => {
          if (type === 'Points') {
            state.student.dailyLearning.payload.settingType = type
            state.student.dailyLearning.payload.point = value
          } else if (type === 'Books') {
            state.student.dailyLearning.payload.settingType = type
            state.student.dailyLearning.payload.books = value
          }
        }),
      changeDailyLearningLevel: (level) =>
        set((state) => {
          state.student.dailyLearning.payload.settingLevelName = level
        }),
      setDailyLearningHistory: (payload) =>
        set((state) => {
          if (payload) {
            state.student.dailyLearning.history = payload
          }
        }),
      addDailyLearningHistory: (date, type, value) =>
        set((state) => {
          const newHistory = makeStudentDailyLearningHistory()
          newHistory.settingDate = date
          newHistory.settingType = type
          if (type === 'Points') {
            newHistory.aimPoint = value
          } else {
            newHistory.settingBooks = value
          }
          state.student.dailyLearning.history.unshift(newHistory)
        }),
    },
  },
})
