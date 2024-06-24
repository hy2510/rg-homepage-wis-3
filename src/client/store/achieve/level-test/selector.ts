import { useRootCreateStore } from '../../store'

export const useAchieveLevelTestAction = () => {
  return useRootCreateStore((state) => state.achieve.levelTest.action)
}

export const useAchieveLevelTest = () => {
  return useRootCreateStore((state) => state.achieve.levelTest)
}
