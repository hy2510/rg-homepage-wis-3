import { SliceStoreCreator } from '../store'
import { AttendCalendarState, createSliceAttendState } from './attend/store'
import {
  StudyCalendarState,
  createSliceStudyCalendarState,
} from './study/store'

export type CalendarState = {
  calendar: AttendCalendarState & StudyCalendarState
}

export const createCalendarStore: SliceStoreCreator<CalendarState> = (...a) => {
  return {
    calendar: {
      ...createSliceAttendState(...a),
      ...createSliceStudyCalendarState(...a),
    },
  }
}
