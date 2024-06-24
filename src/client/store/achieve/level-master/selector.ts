import { useRootCreateStore } from '../../store'

export const useAchieveLevelMasterAction = () => {
  return useRootCreateStore((state) => state.achieve.levelMaster.action)
}

export const useAchieveLevelMaster = () => {
  return useRootCreateStore((state) => state.achieve.levelMaster)
}
