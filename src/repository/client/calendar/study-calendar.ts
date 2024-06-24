import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { StudyCalendar, makeStudyCalendar } from '../object/study-calendar'

type Input = {
  year: number
  month: number
}

type Output = {
  beforeSetup: StudyCalendar
  calendar: StudyCalendar[]
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/calendar/study?year=${input.year}&month=${input.month}`,
    {
      method: 'get',
    }
  )
  return await executeWithAuth(request, (json): Output => {
    return {
      beforeSetup: makeStudyCalendar(json.BeforeSetup),
      calendar: json.StudyCalendar.map((item: any) => {
        return makeStudyCalendar(item)
      }),
    }
  })
}

export { action as getStudyCalendar }
export type { Output as StudyCalendarResponse }

function newInstance(): Output {
  return {
    beforeSetup: makeStudyCalendar(),
    calendar: [],
  }
}
export { newInstance as newStudyCalendar }
