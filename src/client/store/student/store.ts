import { SliceStoreCreator } from '../store'
import { AvatarState, createSliceAvatarState } from './avatar/store'
import {
  ContinuousStudyState,
  createSliceContinuousStudyState,
} from './continuous-study/store'
import {
  DailyLearningState,
  createSliceDailyLearningState,
} from './daily-learning/store'
import { HistoryState, createSliceHistoryState } from './history/store'
import { InfoState, createSliceInfoState } from './info/store'
import {
  LevelTestInfoState,
  createSliceLevelTestInfoState,
} from './level-test-info/store'
import {
  TodayStudyLearningState,
  createSliceTodayStudyLearningState,
} from './today-study/store'

export type StudentState = {
  student: InfoState &
    HistoryState &
    DailyLearningState &
    AvatarState &
    TodayStudyLearningState &
    LevelTestInfoState &
    ContinuousStudyState
}

export const createStudentStore: SliceStoreCreator<StudentState> = (...a) => {
  return {
    student: {
      ...createSliceInfoState(...a),
      ...createSliceHistoryState(...a),
      ...createSliceDailyLearningState(...a),
      ...createSliceAvatarState(...a),
      ...createSliceTodayStudyLearningState(...a),
      ...createSliceLevelTestInfoState(...a),
      ...createSliceContinuousStudyState(...a),
    },
  }
}
