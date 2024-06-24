import { SliceStoreCreator } from '../store'
import { PointState, createSlicePointState } from './point/store'
import {
  ReadingkingState,
  createSliceReadingkingState,
} from './readingking/store'

export type RankingState = {
  ranking: PointState & ReadingkingState
}

export const createRankingStore: SliceStoreCreator<RankingState> = (...a) => {
  return {
    ranking: {
      ...createSlicePointState(...a),
      ...createSliceReadingkingState(...a),
    },
  }
}
