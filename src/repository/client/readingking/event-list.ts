import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { Event, makeEvent } from '../object/event'

type Input = {}

type Output = Event[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/readingking', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json.Event.map((item: any): Event => makeEvent(item))
  })
}

export { action as getReadingKingEventList }
export type { Output as EventListResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newReadingKingEventList }
