import { StudentHistory, makeStudentHistory } from '../object/student-history'
import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {}

type Output = StudentHistory[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/history-list', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json.StudentHistory.map((data: any) => makeStudentHistory(data))
  })
}

export { action as getStudentHistoryList }
export type { Output as StudentHistoryListResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newStudentHistoryList }
