import { SliceStoreCreator } from '../store'

import { SearchBookState, createSliceSearchBookState } from './search/store'
import { TryAgainState, createSliceTryAgainState } from './try-again/store'
import { TodoState, createSliceTodo } from './todos/store'
import { NewBookState, createSliceNewBookState } from './new-book/store'
import { LevelBookState, createSliceLevelBookState } from './level/store'
import { SeriesState, createSliceSeriesState } from './series/store'
import { ThemeState, createSliceThemeState } from './theme/store'
import { FavoriteState, createSliceFavoriteState } from './favorites/store'
import { HomeState, createSliceHomeState } from './home/store'
import { PreKBookState, createSliceLevelPreKState } from './pre-k/store'
import {
  DodoAbcBookState,
  createSliceLevelDodoAbcState,
} from './dodo-abc/store'
import { FilterState, createSliceFilterState } from './filter/store'
import { MovieBookState, createSliceMovieBookState } from './movie/store'

export type LibraryState = {
  library: FilterState &
    HomeState &
    FavoriteState &
    SearchBookState &
    TryAgainState &
    TodoState &
    ThemeState &
    SeriesState &
    NewBookState &
    LevelBookState &
    MovieBookState &
    PreKBookState &
    DodoAbcBookState
}

export const createLibraryStore: SliceStoreCreator<LibraryState> = (...a) => {
  return {
    library: {
      ...createSliceHomeState(...a),
      ...createSliceFavoriteState(...a),
      ...createSliceTodo(...a),
      ...createSliceTryAgainState(...a),
      ...createSliceNewBookState(...a),
      ...createSliceSearchBookState(...a),
      ...createSliceLevelBookState(...a),
      ...createSliceMovieBookState(...a),
      ...createSliceSeriesState(...a),
      ...createSliceThemeState(...a),
      ...createSliceLevelPreKState(...a),
      ...createSliceLevelDodoAbcState(...a),
      ...createSliceFilterState(...a),
    },
  }
}
