import { useRootCreateStore } from '../../store'

export const useCalendarStudyAction = () => {
  return useRootCreateStore((state) => state.calendar.study.action)
}

export const useCalendarStudy = () => {
  return useRootCreateStore((state) => state.calendar.study)
}
