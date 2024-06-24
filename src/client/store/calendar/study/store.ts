import {
  StudyCalendarResponse,
  newStudyCalendar,
} from '@/repository/client/calendar/study-calendar'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    year: number
    month: number
  }
  payload: StudyCalendarResponse
}

type Action = {
  setStudyCalendar: (
    option?: {
      year: number
      month: number
    },
    payload?: StudyCalendarResponse
  ) => void
}

export type StudyCalendarState = {
  study: State & {
    action: Action
  }
}

export const createSliceStudyCalendarState: SliceStoreCreator<
  StudyCalendarState
> = (set) => ({
  study: {
    option: {
      year: 0,
      month: 0,
    },
    payload: newStudyCalendar(),
    action: {
      setStudyCalendar: (option, payload) =>
        set((state) => {
          if (option) {
            state.calendar.study.option = option
          }
          if (payload) {
            state.calendar.study.payload = payload
          }
        }),
    },
  },
})
