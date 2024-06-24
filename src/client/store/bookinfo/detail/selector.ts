import { useRootCreateStore } from '../../store'

export const useBookInfoDetailAction = () => {
  return useRootCreateStore((state) => state.bookinfo.detail.action)
}

export const useBookInfoDetail = () => {
  return useRootCreateStore((state) => state.bookinfo.detail)
}
