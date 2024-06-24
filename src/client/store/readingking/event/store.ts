import {
  EventListResponse,
  newReadingKingEventList,
} from '@/repository/client/readingking/event-list'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: EventListResponse
}

type Action = {
  setEvent: (payload?: EventListResponse) => void
}

export type EventState = {
  event: State & {
    action: Action
  }
}

export const createSliceEventState: SliceStoreCreator<EventState> = (set) => ({
  event: {
    payload: newReadingKingEventList(),
    action: {
      setEvent: (payload) =>
        set((state) => {
          if (payload) {
            state.readingking.event.payload = payload
          }
        }),
    },
  },
})
