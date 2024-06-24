import { useRootCreateStore } from '../../store'

export const useLibraryTodo = () => {
  return useRootCreateStore((state) => state.library.todos)
}

export const useLibraryTodoAction = () => {
  return useRootCreateStore((state) => state.library.todos.action)
}

export const useSelectTodoWithPage = () => {
  const todos = useRootCreateStore((state) => state.library.todos)
  const page = todos.option.page
  const startIdx = 12 * (page - 1)
  const endIdx = 12 * page
  const todoItems = todos.payload.todo.filter((_, idx) => {
    return startIdx <= idx && idx < endIdx
  })
  const count = todos.payload.count
  return {
    option: {
      ...todos.option,
      maxPage: Math.ceil(count / 12),
    },
    payload: {
      todo: todoItems,
      count,
    },
  }
}
