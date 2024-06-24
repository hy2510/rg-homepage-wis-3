import { useRootCreateStore } from '../../store'

export const useLevelTestInfoAction = () => {
  return useRootCreateStore((state) => state.student.levelTestInfo.action)
}

export const useLevelTestInfo = () => {
  return useRootCreateStore((state) => state.student.levelTestInfo)
}
