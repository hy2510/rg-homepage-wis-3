import {
  AttendCalendarResponse,
  newAttendCalendar,
} from '@/repository/client/calendar/attend-calendar'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    year: number
    month: number
  }
  payload: AttendCalendarResponse
}

type Action = {
  setAttend: (
    option?: { year: number; month: number },
    payload?: AttendCalendarResponse
  ) => void
}

export type AttendCalendarState = {
  attend: State & {
    action: Action
  }
}

export const createSliceAttendState: SliceStoreCreator<AttendCalendarState> = (
  set
) => ({
  attend: {
    option: {
      year: 0,
      month: 0,
    },
    payload: newAttendCalendar(),
    action: {
      setAttend: (option, payload) =>
        set((state) => {
          if (option) {
            state.calendar.attend.option = option
          }
          if (payload) {
            state.calendar.attend.payload = payload
          }
        }),
    },
  },
})
