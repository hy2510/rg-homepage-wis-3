import {
  EventUserResponse,
  newReadingKingEventDetail,
} from '@/repository/client/readingking/event-detail'
import {
  EventPrizeListResponse,
  newEventPrizeList,
} from '@/repository/client/readingking/event-prize-list'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    eventId: string
  }
  user: {
    payload: EventUserResponse
  }
  prizes: {
    payload: EventPrizeListResponse
  }
}

type Action = {
  setInfo: (
    option?: { eventId: string },
    user?: EventUserResponse,
    prizes?: EventPrizeListResponse,
  ) => void
  setEventPrize: (eventPrizeId: string) => void
}

export type InfoState = {
  info: State & {
    action: Action
  }
}

export const createSliceInfoState: SliceStoreCreator<InfoState> = (set) => ({
  info: {
    option: {
      eventId: '',
    },
    user: { payload: newReadingKingEventDetail() },
    prizes: { payload: newEventPrizeList() },
    action: {
      setInfo: (option, user, prizes) =>
        set((state) => {
          if (option) {
            state.readingking.info.option = option
          }
          if (user) {
            state.readingking.info.user.payload = user
          }
          if (prizes) {
            state.readingking.info.prizes.payload = prizes
          }
        }),
      setEventPrize: (eventPrizeId) =>
        set((state) => {
          const currentPrize = state.readingking.info.prizes.payload.find(
            (item) => item.eventPrizeId === eventPrizeId,
          )
          if (currentPrize) {
            const newUserInfo = {
              ...state.readingking.info.user.payload,
              aimPoint: currentPrize.prizePoint,
              aimDays: currentPrize.prizeDays,
              eventPrizeId: currentPrize.eventPrizeId,
              prizeTitle: currentPrize.prizeTitle,
            }
            state.readingking.info.user.payload = newUserInfo
          }
        }),
    },
  },
})
