import { useRootCreateStore } from '../../store'

export const useCalendarAttendAction = () => {
  return useRootCreateStore((state) => state.calendar.attend.action)
}

export const useCalendarAttend = () => {
  return useRootCreateStore((state) => state.calendar.attend)
}
