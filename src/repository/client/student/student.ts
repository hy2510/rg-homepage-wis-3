import { Student, makeStudent } from '../object/student'
import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {}

type Output = Student

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return makeStudent(json)
  })
}

export { action as getStudent }
export type { Output as StudentResponse }

function newInstance(): Output {
  return makeStudent()
}
export { newInstance as newStudent }
