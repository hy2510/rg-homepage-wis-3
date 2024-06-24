import { SliceStoreCreator } from '../../store'

type State = {
  EB: {
    sort: string
    status: string
    genre: string
  }
  PB: {
    sort: string
    status: string
    genre: string
  }
  PK: {
    activity: string
  }
  Dodo: {
    activity: string
  }
}

type Action = {
  setEbPbFilter: (
    type: string,
    option: { sort: string; status: string; genre: string }
  ) => void
  setPkFilter: (option: { activity: string }) => void
  setDodoFilter: (option: { activity: string }) => void
}

export type FilterState = {
  filter: State & {
    action: Action
  }
}

export const createSliceFilterState: SliceStoreCreator<FilterState> = (
  set
) => ({
  filter: {
    EB: {
      sort: 'Preference',
      status: 'All',
      genre: 'All',
    },
    PB: {
      sort: 'Preference',
      status: 'All',
      genre: 'All',
    },
    PK: {
      activity: 'All',
    },
    Dodo: {
      activity: 'Study-Alphabet',
    },
    action: {
      setEbPbFilter: (type, option) =>
        set((state) => {
          if (type === 'EB') {
            state.library.filter.EB = option
          } else {
            state.library.filter.PB = option
          }
        }),
      setPkFilter: (option) =>
        set((state) => {
          state.library.filter.PK = option
        }),
      setDodoFilter: (option) =>
        set((state) => {
          state.library.filter.Dodo = option
        }),
    },
  },
})
