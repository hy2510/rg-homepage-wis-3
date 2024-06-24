import { useRootCreateStore } from '../../store'

export const usePointRankingAction = () => {
  return useRootCreateStore((state) => state.ranking.point.action)
}

export const usePointRanking = () => {
  return useRootCreateStore((state) => state.ranking.point)
}
