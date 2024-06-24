import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { EventPrize, makeEventPrize } from '../object/event-prize'

type Input = {
  eventId: string
}
type Output = EventPrize[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/readingking/prize', {
    method: 'get',
    queryString: {
      eventId: input.eventId,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return json.EventPrize.map((item: any): EventPrize => makeEventPrize(item))
  })
}

export { action as getReadingKingEventPrizeList }
export type { Output as EventPrizeListResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newEventPrizeList }
