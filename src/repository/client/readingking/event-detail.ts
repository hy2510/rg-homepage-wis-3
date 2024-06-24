import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import {
  EventUserDetail,
  makeEventuserDetail,
} from '../object/event-user-detail'

type Input = {
  eventId: string
}

type Output = EventUserDetail

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/readingking/${input.eventId}`, {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return makeEventuserDetail(json)
  })
}

export { action as getReadingKingEventDetail }
export type { Output as EventUserResponse }

function newInstance(): Output {
  return makeEventuserDetail()
}
export { newInstance as newReadingKingEventDetail }
