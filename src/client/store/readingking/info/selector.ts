import { useRootCreateStore } from '../../store'

export const useReadingkingInfoAction = () => {
  return useRootCreateStore((state) => state.readingking.info.action)
}

export const useReadingkingInfo = () => {
  return useRootCreateStore((state) => state.readingking.info)
}
