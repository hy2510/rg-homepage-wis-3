import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../../utils'

type Input = {
  studyIds: string[]
  studentHistoryIds: string[]
}

type Output = string

async function action(input: Input): Promise<ApiResponse<Output>> {
  let studyIds = ''
  input.studyIds.forEach((studyId) => {
    studyIds += `${studyId}|`
  })
  let studentHistoryIds = ''
  input.studentHistoryIds.forEach((studentHistoryId) => {
    studentHistoryIds += `${studentHistoryId}|`
  })
  const request = makeRequest('api/export/student-report', {
    method: 'get',
    queryString: {
      studyIds,
      studentHistoryIds,
    },
  })
  return await execute(request, (json): Output => {
    return json.Url
  })
}

export { action as getExportStudentReport }
