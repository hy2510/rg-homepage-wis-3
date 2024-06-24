import { useLibraryDodoAbcLevelAction } from './dodo-abc/selector'
import { useLibraryFavoriteAction } from './favorites/selector'
import { useLibraryHomeAction } from './home/selector'
import { useLibraryLevelAction } from './level/selector'
import { useLibraryMovieAction } from './movie/selector'
import { useLibraryNewBookAction } from './new-book/selector'
import { useLibraryPreKLevelAction } from './pre-k/selector'
import { useLibrarySearchAction } from './search/selector'
import { useLibrarySeriesAction } from './series/selector'
import { useLibraryThemeAction } from './theme/selector'
import { useLibraryTryAgainAction } from './try-again/selector'

export function useUpdateBookListTodo() {
  const addBookFunctions: ((
    levelRoundIds: string[],
    isAdd: boolean,
  ) => void)[] = [
    useLibraryHomeAction().updateAddTodoFlag,
    useLibraryLevelAction().updateAddTodoFlag,
    useLibrarySeriesAction().updateAddTodoFlag,
    useLibraryThemeAction().updateAddTodoFlag,
    useLibraryMovieAction().updateAddTodoFlag,
    useLibraryDodoAbcLevelAction().updateAddTodoFlag,
    useLibraryPreKLevelAction().updateAddTodoFlag,
    useLibraryTryAgainAction().updateAddTodoFlag,
    useLibraryFavoriteAction().updateAddTodoFlag,
    useLibrarySearchAction().updateAddTodoFlag,
    useLibraryNewBookAction().updateAddTodoFlag,
  ]

  return (levelRoundIds: string[], isAdd: boolean) => {
    addBookFunctions.forEach((fn) => {
      fn(levelRoundIds, isAdd)
    })
  }
}
