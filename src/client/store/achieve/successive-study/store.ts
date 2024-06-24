import {
  SuccessiveStudyResponse,
  newSuccessiveStudy,
} from '@/repository/client/achievement/success-study'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: SuccessiveStudyResponse
}

type Action = {
  setSuccessiveStudy: (payload?: SuccessiveStudyResponse) => void
}

export type SuccessiveStudyState = {
  successiveStudy: State & {
    action: Action
  }
}

export const createSliceSuccessiveStudyState: SliceStoreCreator<
  SuccessiveStudyState
> = (set) => ({
  successiveStudy: {
    payload: newSuccessiveStudy(),
    action: {
      setSuccessiveStudy: (payload) =>
        set((state) => {
          if (payload) {
            state.achieve.successiveStudy.payload = payload
          }
        }),
    },
  },
})
