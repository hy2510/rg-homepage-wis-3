import { SliceStoreCreator } from '../store'
import { EventState, createSliceEventState } from './event/store'
import { InfoState, createSliceInfoState } from './info/store'

export type ReadingkingState = {
  readingking: EventState & InfoState
}

export const createReadingkingStore: SliceStoreCreator<ReadingkingState> = (
  ...a
) => {
  return {
    readingking: {
      ...createSliceEventState(...a),
      ...createSliceInfoState(...a),
    },
  }
}
