import { useRootCreateStore } from '../../store'

export const useAchieveReadingKingTrophyAction = () => {
  return useRootCreateStore((state) => state.achieve.readingkingTrophy.action)
}

export const useAchieveReadingKingTrophy = () => {
  return useRootCreateStore((state) => state.achieve.readingkingTrophy)
}
