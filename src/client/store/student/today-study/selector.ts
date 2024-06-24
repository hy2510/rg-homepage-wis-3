import { useRootCreateStore } from '../../store'

export const useStudentTodayStudyAction = () => {
  return useRootCreateStore((state) => state.student.todayStudy.action)
}

export const useStudentTodayStudy = () => {
  return useRootCreateStore((state) => state.student.todayStudy)
}
