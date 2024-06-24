import { useRootCreateStore } from '../../store'

export const useHistorySpeakAction = () => {
  return useRootCreateStore((state) => state.history.speak.action)
}

export const useHistorySpeak = () => {
  return useRootCreateStore((state) => state.history.speak)
}
