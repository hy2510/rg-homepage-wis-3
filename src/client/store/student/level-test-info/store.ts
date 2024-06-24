import {
  LevelTestInfoResponse,
  newLevelTestInfo,
} from '@/repository/client/student/level-test-info'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: LevelTestInfoResponse
}

type Action = {
  setLevelTestInfo: (payload?: LevelTestInfoResponse) => void
}

export type LevelTestInfoState = {
  levelTestInfo: State & {
    action: Action
  }
}

export const createSliceLevelTestInfoState: SliceStoreCreator<
  LevelTestInfoState
> = (set) => ({
  levelTestInfo: {
    payload: newLevelTestInfo(),
    action: {
      setLevelTestInfo: (payload) =>
        set((state) => {
          if (payload) {
            state.student.levelTestInfo.payload = payload
          }
        }),
    },
  },
})
