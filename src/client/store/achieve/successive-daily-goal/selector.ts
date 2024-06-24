import { useRootCreateStore } from '../../store'

export const useAchieveSuccessiveDailyGoalAction = () => {
  return useRootCreateStore((state) => state.achieve.successiveDailyGoal.action)
}

export const useAchieveSuccessiveDailyGoal = () => {
  return useRootCreateStore((state) => state.achieve.successiveDailyGoal)
}
