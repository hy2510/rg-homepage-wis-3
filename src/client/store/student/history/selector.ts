import { useRootCreateStore } from '../../store'

export const useStudentHistoryAction = () => {
  return useRootCreateStore((state) => state.student.history.action)
}

export const useStudentHistory = () => {
  return useRootCreateStore((state) => state.student.history)
}
