import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'
import { Todo, makeTodo } from '../../object/todo'

type Input = {
  sortColumn?: string
  levelRoundIds: string[]
  studentHistoryId: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  let levelRoundIds = ''
  input.levelRoundIds.forEach((levelRoundId) => {
    levelRoundIds += `${levelRoundId}|`
  })
  const request = makeRequest(`api/library/todo`, {
    method: 'post',
    body: {
      levelRoundIds: levelRoundIds,
      studentHistoryId: input.studentHistoryId,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as postTodoAdd }
