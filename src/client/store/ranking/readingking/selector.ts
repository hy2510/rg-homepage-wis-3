import { useRootCreateStore } from '../../store'

export const useReadingkingRankingAction = () => {
  return useRootCreateStore((state) => state.ranking.readingking.action)
}

export const useReadingkingRanking = () => {
  return useRootCreateStore((state) => state.ranking.readingking)
}
