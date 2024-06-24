import { Todo, makeTodo } from '../../object/todo'
import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  studyIds: string[]
  sortColumn?: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  let studyIds = ''
  input.studyIds.forEach((studyId) => {
    studyIds += `${studyId}|`
  })
  const request = makeRequest(`api/library/todo?studyIds=${studyIds}`, {
    method: 'delete',
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as deleteTodo }
