import { Todo, makeTodo } from '../../object/todo'
import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  sortColumn?: string
}

type Output = {
  success: boolean
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/library/todo?isAll=Y`, {
    method: 'delete',
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as deleteTodoAll }
