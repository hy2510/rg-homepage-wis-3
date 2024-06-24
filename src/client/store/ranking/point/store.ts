import {
  RankingPointResponse,
  newRankingPoint,
} from '@/repository/client/ranking/point-ranking'
import { SliceStoreCreator } from '../../store'

type State = {
  monthly: {
    payload: RankingPointResponse
  }
  total: {
    payload: RankingPointResponse
  }
}

type Action = {
  setMonthlyRanking: (payload?: RankingPointResponse) => void
  setTotalRanking: (payload?: RankingPointResponse) => void
}

export type PointState = {
  point: State & {
    action: Action
  }
}

export const createSlicePointState: SliceStoreCreator<PointState> = (set) => ({
  point: {
    monthly: { payload: newRankingPoint() },
    total: { payload: newRankingPoint() },
    action: {
      setMonthlyRanking: (payload) =>
        set((state) => {
          if (payload) {
            state.ranking.point.monthly.payload = payload
          }
        }),
      setTotalRanking: (payload) =>
        set((state) => {
          if (payload) {
            state.ranking.point.total.payload = payload
          }
        }),
    },
  },
})
