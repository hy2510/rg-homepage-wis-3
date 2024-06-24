import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  eventId: string
  eventPrizeId: string
}

type Output = {}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/readingking/prize', {
    method: 'post',
    body: {
      eventId: input.eventId,
      eventPrizeId: input.eventPrizeId,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {}
  })
}

export { action as getReadingKingEventSet }
export type { Output as EventPrizeSetResponse }
