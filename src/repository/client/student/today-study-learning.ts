import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { StudyCalendar, makeStudyCalendar } from '../object/study-calendar'

type Input = {}

type Output = StudyCalendar

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/today-learning', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return makeStudyCalendar(json)
  })
}

export { action as getTodayStudyLearning }
export type { Output as TodayStudyLearningResponse }

function newInstance(): Output {
  return makeStudyCalendar()
}
export { newInstance as newTodayStudyLearning }
