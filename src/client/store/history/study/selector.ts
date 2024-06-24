import { useRootCreateStore } from '../../store'

export const useHistoryStudyAction = () => {
  return useRootCreateStore((state) => state.history.study.action)
}

export const useHistoryStudy = () => {
  return useRootCreateStore((state) => state.history.study)
}
