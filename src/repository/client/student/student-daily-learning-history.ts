import { ApiResponse } from '@/http/common/response'
import {
  StudentDailyLearningHistory,
  makeStudentDailyLearningHistory,
} from '../object/student-daily-learning-history'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {}

type Output = StudentDailyLearningHistory[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/daily-learning-history', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json.DailyLearningHistory.map((item: any) => {
      return makeStudentDailyLearningHistory(item)
    })
  })
}

export { action as getStudentDailyLearningHistory }
export type { Output as StudentDailyLearningHistoryResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newStudentDailyLearningHistory }
