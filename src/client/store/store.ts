import { StateCreator, create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { AchieveState, createAchieveStore } from './achieve/store'
import { BookInfoState, createBookInfoStore } from './bookinfo/store'
import { CalendarState, createCalendarStore } from './calendar/store'
import { CustomerState, createCustomerStore } from './customer/store'
import { HistoryState, createHistoryStore } from './history/store'
import { LibraryState, createLibraryStore } from './library/store'
import { RankingState, createRankingStore } from './ranking/store'
import { ReadingkingState, createReadingkingStore } from './readingking/store'
import { StudentState, createStudentStore } from './student/store'

type State = CustomerState &
  StudentState &
  LibraryState &
  BookInfoState &
  HistoryState &
  AchieveState &
  CalendarState &
  ReadingkingState &
  RankingState

export type SliceStoreCreator<T> = StateCreator<
  State,
  [['zustand/immer', never], never],
  [],
  T
>

export const useRootCreateStore = create<State>()(
  immer((...a) => {
    return {
      ...createCustomerStore(...a),
      ...createStudentStore(...a),
      ...createLibraryStore(...a),
      ...createBookInfoStore(...a),
      ...createHistoryStore(...a),
      ...createAchieveStore(...a),
      ...createCalendarStore(...a),
      ...createReadingkingStore(...a),
      ...createRankingStore(...a),
    }
  }),
)

export const useRootState = () => useRootCreateStore((state) => state)
