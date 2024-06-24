import { SliceStoreCreator } from '../store'
import { SpeakHistoryState, createSliceSpeakHistoryState } from './speak/store'
import { StudyHistoryState, createSliceStudyHistoryState } from './study/store'

export type HistoryState = {
  history: StudyHistoryState & SpeakHistoryState
}

export const createHistoryStore: SliceStoreCreator<HistoryState> = (...a) => {
  return {
    history: {
      ...createSliceStudyHistoryState(...a),
      ...createSliceSpeakHistoryState(...a),
    },
  }
}
