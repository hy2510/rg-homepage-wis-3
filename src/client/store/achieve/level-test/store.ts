import {
  LevelTestResponse,
  newLevelTest,
} from '@/repository/client/achievement/level-test'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: LevelTestResponse
}

type Action = {
  setLevelTest: (payload?: LevelTestResponse) => void
}

export type LevelTestState = {
  levelTest: State & {
    action: Action
  }
}

export const createSliceLevelTestState: SliceStoreCreator<LevelTestState> = (
  set
) => ({
  levelTest: {
    payload: newLevelTest(),
    action: {
      setLevelTest: (payload) =>
        set((state) => {
          if (payload) {
            state.achieve.levelTest.payload = payload
          }
        }),
    },
  },
})
