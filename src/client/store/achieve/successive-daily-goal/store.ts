import {
  SuccessiveDailyGoalResponse,
  newSuccessiveDailyGoal,
} from '@/repository/client/achievement/success-daily-goal'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: SuccessiveDailyGoalResponse
}

type Action = {
  setSuccessiveDailyGoal: (payload?: SuccessiveDailyGoalResponse) => void
}

export type SuccessiveDailyGoalState = {
  successiveDailyGoal: State & {
    action: Action
  }
}

export const createSliceSuccessiveDailyGoalState: SliceStoreCreator<
  SuccessiveDailyGoalState
> = (set) => ({
  successiveDailyGoal: {
    payload: newSuccessiveDailyGoal(),
    action: {
      setSuccessiveDailyGoal: (payload) =>
        set((state) => {
          if (payload) {
            state.achieve.successiveDailyGoal.payload = payload
          }
        }),
    },
  },
})
