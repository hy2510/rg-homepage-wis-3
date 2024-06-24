import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import {
  useFetchExportBookListUrl,
  useFetchExportStudentReportUrl,
  useFetchExportVocabularyUrl,
} from '@/client/store/library/export/hook'
import {
  useFetchLibraryAddFavroite,
  useFetchLibraryDeleteFavorite,
  useFetchLibraryFavorite,
} from '@/client/store/library/favorites/hook'
import { useUpdateBookListTodo } from '@/client/store/library/hook'
import {
  useFetchLibraryAddTodo,
  useFetchLibraryDeleteTodo,
  useFetchLibraryTodos,
} from '@/client/store/library/todos/hook'

export type ExportAction =
  | 'add-todo'
  | 'add-favorite'
  | 'delete-todo'
  | 'delete-favorite'
  | 'vocabulary'
  | 'book-list'
  | 'report'
  | 'list'
  | 'todo'
  | 'favorite'
export type ExportSelectItem = {
  levelRoundId: string
  studyId?: string
  studentHistoryId?: string
  extra?: any
}

export default function useExport({
  studentHistoryId,
}: {
  studentHistoryId?: string
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [isSelectMode, setStateSelectMode] = useState(false)
  const [selectedExportItem, setSelectedExportItem] = useState<
    Map<string, ExportSelectItem>
  >(new Map())
  const setItemSelectedChange = (
    key: string,
    item: ExportSelectItem,
    isChecked: boolean,
  ) => {
    const newMap = new Map(selectedExportItem)
    if (isChecked) {
      newMap.set(key, { ...item })
    } else {
      newMap.delete(key)
    }
    setSelectedExportItem(newMap)
  }

  const getSelectedItems = (
    isUseFilter?: (item?: ExportSelectItem) => boolean,
  ) => {
    const items: ExportSelectItem[] = []
    selectedExportItem.forEach((item) => {
      if (!isUseFilter || (isUseFilter && isUseFilter(item))) {
        items.push(item)
      }
    })
    return items
  }

  const resetSelectedItem = () => {
    setSelectedExportItem(new Map())
  }

  const setSelectMode = (isOn: boolean) => {
    if (isOn) {
      setStateSelectMode(true)
    } else {
      resetSelectedItem()
      setStateSelectMode(false)
    }
  }

  const isSelectedItem = (key: string) => {
    return selectedExportItem.has(key)
  }

  const isSelectableStudentHistory = !studentHistoryId

  const [selectedAction, setSelectedAction] = useState<
    ExportAction | undefined
  >(undefined)
  const { fetch: todoListReload } = useFetchLibraryTodos()
  const { fetch: favoriteReload } = useFetchLibraryFavorite()

  const updateBookList = useUpdateBookListTodo()
  const { fetch: addTodo } = useFetchLibraryAddTodo()
  const { fetch: addFavorite } = useFetchLibraryAddFavroite()
  const { fetch: deleteTodo } = useFetchLibraryDeleteTodo()
  const { fetch: deleteFavorite } = useFetchLibraryDeleteFavorite()

  const { fetch: exportBookList } = useFetchExportBookListUrl()
  const { fetch: exportVocabulary } = useFetchExportVocabularyUrl()
  const { fetch: exportReport } = useFetchExportStudentReportUrl()

  const onAddTodos = (levelRoundIds: string[], studentHistoryId: string) => {
    if (levelRoundIds.length === 0) {
      alert(t('t340'))
      return
    }
    addTodo({
      levelRoundIds,
      studentHistoryId,
      callback: ({ success, error }) => {
        if (success) {
          todoListReload({ isReload: true })
          updateBookList(levelRoundIds, true)
          alert(t('t340'))
        } else if (error) {
          if ((error as any).message) {
            alert((error as any).message)
          } else {
            alert(t('t341'))
          }
        }
      },
    })
  }

  const onAddFavorites = (levelRoundIds: string[]) => {
    addFavorite({
      levelRoundIds,
      callback: ({ success, error }) => {
        if (success) {
          favoriteReload({ status: 'All' })
          alert(t('t342'))
        } else if (error) {
          if ((error as any).message) {
            alert((error as any).message)
          } else {
            alert(t('t343'))
          }
        }
      },
    })
  }

  const onDeleteTodos = (studyIds: string[], levelRoundIds: string[]) => {
    deleteTodo({
      studyIds,
      callback: ({ success, error }) => {
        if (success) {
          todoListReload({ isReload: true, page: 1 })
          updateBookList(levelRoundIds, true)
          alert('Todo에서 삭제되었습니다.')
          setSelectMode(false)
        } else if (error) {
          if ((error as any).message) {
            alert((error as any).message)
          } else {
            alert(t('t381'))
          }
        }
      },
    })
  }

  const onDeleteFavorites = (levelRoundIds: string[]) => {
    deleteFavorite({
      levelRoundIds,
      callback: ({ success, error }) => {
        if (success) {
          favoriteReload({ status: 'All', page: 1 })
          alert('Favorite에서 삭제되었습니다.')
          setSelectMode(false)
        } else if (error) {
          if ((error as any).message) {
            alert((error as any).message)
          } else {
            alert(t('t369'))
          }
        }
      },
    })
  }

  const onExportVocabularys = (
    levelRoundIds: string[],
    studentHistoryId: string,
  ) => {
    exportVocabulary({
      levelRoundIds,
      studentHistoryId,
      callback: ({ success, payload, error }) => {
        if (success) {
          window.open(payload, '_blank', 'noopener, noreferrer')
        }
      },
    })
  }

  const onExportBookLists = (levelRoundIds: string[]) => {
    exportBookList({
      levelRoundIds,
      callback: ({ success, payload, error }) => {
        if (success) {
          window.open(payload, '_blank', 'noopener, noreferrer')
        }
      },
    })
  }

  const onExportReports = (studyIds: string[], studentHistoryIds: string[]) => {
    exportReport({
      studyIds,
      studentHistoryIds,
      callback: ({ success, payload, error }) => {
        if (success) {
          window.open(payload, '_blank', 'noopener, noreferrer')
        }
      },
    })
  }

  const onExportAction = (action: ExportAction) => {
    if (selectedExportItem.size === 0) {
      return
    }
    const isDependencyStudentHistory =
      action === 'add-todo' || action === 'vocabulary'
    if (isDependencyStudentHistory && isSelectableStudentHistory) {
      setSelectedAction(action)
    } else {
      onExportActionWithStudentHistoryId(action, studentHistoryId)
    }
  }

  const onExportActionWithStudentHistoryId = (
    action: ExportAction,
    studentHistoryId?: string,
  ) => {
    if (selectedExportItem.size === 0) {
      return
    }
    if (action === 'add-todo') {
      if (studentHistoryId) {
        const levelRoundIds = getSelectedItems((item) => !item?.extra).map(
          (item) => item.levelRoundId,
        )
        onAddTodos(levelRoundIds, studentHistoryId)
      }
    } else if (action === 'add-favorite') {
      const levelRoundIds = getSelectedItems().map((item) => item.levelRoundId)
      onAddFavorites(levelRoundIds)
    } else if (action === 'delete-todo') {
      const studyIds: string[] = []
      const levelRoundIds: string[] = []
      getSelectedItems((item) => !!item?.studyId).forEach((item) => {
        studyIds.push(item.studyId!)
        levelRoundIds.push(item.levelRoundId)
      })
      onDeleteTodos(studyIds, levelRoundIds)
    } else if (action === 'delete-favorite') {
      const levelRoundIds = getSelectedItems().map((item) => item.levelRoundId)
      onDeleteFavorites(levelRoundIds)
    } else if (action === 'book-list') {
      const levelRoundIds = getSelectedItems().map((item) => item.levelRoundId)
      onExportBookLists(levelRoundIds)
    } else if (action === 'vocabulary') {
      if (studentHistoryId) {
        const levelRoundIds = getSelectedItems().map(
          (item) => item.levelRoundId,
        )
        onExportVocabularys(levelRoundIds, studentHistoryId)
      }
    } else if (action === 'report') {
      const studyIds: string[] = []
      const studentHistoryIds: string[] = []
      getSelectedItems((item) => !!item?.studyId).forEach((item) => {
        studyIds.push(item.studyId!)
        studentHistoryIds.push(item.studentHistoryId!)
      })
      onExportReports(studyIds, studentHistoryIds)
    }
    setSelectedAction(undefined)
  }

  const onSelectStudentHistory = (studentHistoryId: string) => {
    if (selectedAction) {
      onExportActionWithStudentHistoryId(selectedAction, studentHistoryId)
    }
  }

  const onExportCancel = () => {
    setSelectedAction(undefined)
  }

  return {
    isSelectMode,
    setSelectMode,
    getSelectedItems,
    selectedItemCount: selectedExportItem.size,
    isSelectedItem,
    resetSelectedItem,
    setItemSelectedChange,
    onExportAction,
    isSelectStudentHistory: !!selectedAction,
    isSelectableStudentHistory: !studentHistoryId,
    onSelectStudentHistory,
    onExportCancel,
  }
}

export function useSupportExportActionSearch(): {
  action: ExportAction
  label: string
}[] {
  return [
    {
      action: 'vocabulary',
      label: 'Vocabulary',
    },
    {
      action: 'book-list',
      label: 'Book List',
    },
    {
      action: 'add-todo',
      label: 'To-Do',
    },
    {
      action: 'add-favorite',
      label: 'Favorite',
    },
  ]
}

export function useSupportExportActionTodo(): {
  action: ExportAction
  label: string
}[] {
  return [
    {
      action: 'vocabulary',
      label: 'Vocabulary',
    },
    {
      action: 'book-list',
      label: 'Book List',
    },
  ]
}

export function useSupportExportActionFavorite(): {
  action: ExportAction
  label: string
}[] {
  return [
    {
      action: 'vocabulary',
      label: 'Vocabulary',
    },
    {
      action: 'book-list',
      label: 'Book List',
    },
  ]
}

export function useSupportExportActionReport(): {
  action: ExportAction
  label: string
}[] {
  return [
    {
      action: 'vocabulary',
      label: 'Vocabulary',
    },
    {
      action: 'report',
      label: 'Report',
    },
    {
      action: 'book-list',
      label: 'Book List',
    },
  ]
}
