import { useRootCreateStore } from '../../store'

export const useAchieveLevelBooksAction = () => {
  return useRootCreateStore((state) => state.achieve.levelBooks.action)
}

export const useAchieveLevelBooks = () => {
  return useRootCreateStore((state) => state.achieve.levelBooks)
}

export const useLoadedAchieveLevelBooks = () => {
  const levelBooks = useRootCreateStore((state) => state.achieve.levelBooks)
  return levelBooks.payload.EB.length + levelBooks.payload.PB.length > 0
}
