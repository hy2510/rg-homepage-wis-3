import { useRootCreateStore } from '../../store'

export const useStudentContinuousStudyAction = () => {
  return useRootCreateStore((state) => state.student.continuous.action)
}

export const useStudentContinuousStudy = () => {
  return useRootCreateStore((state) => state.student.continuous.payload)
}
