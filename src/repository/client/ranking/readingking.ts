import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  RankReadingking,
  makeRankReadingking,
} from '../object/rank-readingking'
import {
  executeWithAuth,
  makeRequestOption,
  makeRequestWithCustomer,
} from '../utils'

type Input = {
  isLogin?: boolean
  eventId: string
}

type Output = {
  user?: RankReadingking
  list: RankReadingking[]
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const path = `api/ranking/readingking`
  const option = makeRequestOption({
    method: 'get',
    queryString: {
      eventId: input.eventId,
    },
  })
  const request = makeRequestWithCustomer(path, option)
  const doAction = input.isLogin ? executeWithAuth : execute

  return await doAction(request, (json): Output => {
    const user = json.Me ? makeRankReadingking(json.Me) : undefined
    const list = json.Rank.map((json: any) => {
      return makeRankReadingking(json)
    })
    return {
      user,
      list,
    }
  })
}

export { action as getRankingReadingking }
export type { Output as RankingReadingkingResponse }

function newInstance(): Output {
  return {
    list: [],
  }
}
export { newInstance as newRankingReadingking }
