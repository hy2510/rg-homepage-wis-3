import {
  StudentDailyLearning as StudentDailyLearning,
  makeStudentDailyLearning,
} from '../object/student-daily-learning'
import { StudentHistory, makeStudentHistory } from '../object/student-history'
import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {}

type Output = StudentDailyLearning

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/daily-learning', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return makeStudentDailyLearning(json)
  })
}

export { action as getStudentDailyLearning }
export type { Output as StudentDailyLearningResponse }

function newInstance(): Output {
  return makeStudentDailyLearning()
}
export { newInstance as newStudentDailyLearning }
