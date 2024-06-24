import { useRootCreateStore } from '../../store'

export const useAchieveSuccessiveStudyAction = () => {
  return useRootCreateStore((state) => state.achieve.successiveStudy.action)
}

export const useAchieveSuccessiveStudy = () => {
  return useRootCreateStore((state) => state.achieve.successiveStudy)
}
