import {
  LevelMasterResponse,
  newLevelMaster,
} from '@/repository/client/achievement/level-master'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: LevelMasterResponse
}

type Action = {
  setLevelMaster: (payload?: LevelMasterResponse) => void
}

export type LevelMasterState = {
  levelMaster: State & {
    action: Action
  }
}

export const createSliceLevelMasterState: SliceStoreCreator<
  LevelMasterState
> = (set) => ({
  levelMaster: {
    payload: newLevelMaster(),
    action: {
      setLevelMaster: (payload) =>
        set((state) => {
          if (payload) {
            state.achieve.levelMaster.payload = payload
          }
        }),
    },
  },
})
