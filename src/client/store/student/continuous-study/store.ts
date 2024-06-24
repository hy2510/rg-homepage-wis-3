import { SliceStoreCreator } from '../../store'

type State = {
  payload: number
}

type Action = {
  setContinuousStudy: (payload?: number) => void
}

export type ContinuousStudyState = {
  continuous: State & {
    action: Action
  }
}

export const createSliceContinuousStudyState: SliceStoreCreator<
  ContinuousStudyState
> = (set) => ({
  continuous: {
    payload: 0,
    action: {
      setContinuousStudy: (payload) =>
        set((state) => {
          if (payload) {
            state.student.continuous.payload = payload
          }
        }),
    },
  },
})
