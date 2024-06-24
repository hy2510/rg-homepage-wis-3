import { TodosResponse, newTodo } from '@/repository/client/library/todo/todo'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    page: number
    sortOption: string
  }
  count: number
  payload: TodosResponse
}

type Action = {
  setTodo: (
    option?: {
      page: number
      sortOption: string
    },
    payload?: TodosResponse,
  ) => void
  setTodoCount: (count: number) => void
}

export type TodoState = {
  todos: State & {
    action: Action
  }
}
export const createSliceTodo: SliceStoreCreator<TodoState> = (set) => ({
  todos: {
    option: {
      page: 1,
      sortOption: 'RegistDate',
    },
    count: 0,
    payload: newTodo(),
    action: {
      setTodo: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.todos.option = option
          }
          if (payload) {
            state.library.todos.payload = payload
            state.library.todos.count = payload.count
          }
        }),
      setTodoCount: (count) =>
        set((state) => {
          if (state.library.todos.payload) {
            state.library.todos.count = count
          }
        }),
    },
  },
})
