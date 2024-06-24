import { useRootCreateStore } from '../../store'

export const useReadingkingEventAction = () => {
  return useRootCreateStore((state) => state.readingking.event.action)
}

export const useReadingkingEvent = () => {
  return useRootCreateStore((state) => state.readingking.event)
}
