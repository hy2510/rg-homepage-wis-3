import { SliceStoreCreator } from '../store'
import {
  LevelBooksState,
  createSliceLevelBooksState,
} from './level-books/store'
import {
  LevelMasterState,
  createSliceLevelMasterState,
} from './level-master/store'
import {
  LevelPointState,
  createSliceLevelPointState,
} from './level-point/store'
import { LevelTestState, createSliceLevelTestState } from './level-test/store'
import {
  ReadingKingTrophyState,
  createSliceReadingKingTrophyState,
} from './readingking-trophy/store'
import {
  SuccessiveDailyGoalState,
  createSliceSuccessiveDailyGoalState,
} from './successive-daily-goal/store'
import {
  SuccessiveStudyState,
  createSliceSuccessiveStudyState,
} from './successive-study/store'

export type AchieveState = {
  achieve: LevelBooksState &
    LevelPointState &
    LevelMasterState &
    LevelTestState &
    SuccessiveDailyGoalState &
    SuccessiveStudyState &
    ReadingKingTrophyState
}

export const createAchieveStore: SliceStoreCreator<AchieveState> = (...a) => {
  return {
    achieve: {
      ...createSliceLevelBooksState(...a),
      ...createSliceLevelPointState(...a),
      ...createSliceLevelMasterState(...a),
      ...createSliceLevelTestState(...a),
      ...createSliceSuccessiveDailyGoalState(...a),
      ...createSliceSuccessiveStudyState(...a),
      ...createSliceReadingKingTrophyState(...a),
    },
  }
}
