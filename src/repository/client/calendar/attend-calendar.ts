import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { AttendCalendar, makeAttendCalendar } from '../object/attend-calendar'

type Input = {
  year: number
  month: number
}

type Output = AttendCalendar[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/calendar/attend?year=${input.year}&month=${input.month}`,
    {
      method: 'get',
    }
  )
  return await executeWithAuth(request, (json): Output => {
    return json.AttendCalendar.map((item: any) => {
      return makeAttendCalendar(item)
    })
  })
}

export { action as getAttendCalendar }
export type { Output as AttendCalendarResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newAttendCalendar }
