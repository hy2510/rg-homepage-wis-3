import {
  TodayStudyLearningResponse,
  newTodayStudyLearning,
} from '@/repository/client/student/today-study-learning'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: TodayStudyLearningResponse
}

type Action = {
  setTodayStudyLearning: (payload?: TodayStudyLearningResponse) => void
}

export type TodayStudyLearningState = {
  todayStudy: State & {
    action: Action
  }
}

export const createSliceTodayStudyLearningState: SliceStoreCreator<
  TodayStudyLearningState
> = (set) => ({
  todayStudy: {
    payload: newTodayStudyLearning(),
    action: {
      setTodayStudyLearning: (payload) =>
        set((state) => {
          if (payload) {
            state.student.todayStudy.payload = payload
          }
        }),
    },
  },
})
