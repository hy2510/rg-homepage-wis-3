import { useRootCreateStore } from '../../store'

export const useAchieveLevelPointAction = () => {
  return useRootCreateStore((state) => state.achieve.levelPoint.action)
}

export const useAchieveLevelPoint = () => {
  return useRootCreateStore((state) => state.achieve.levelPoint)
}
