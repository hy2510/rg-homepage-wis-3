import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { RankPoint, makeRankPoint } from '../object/rank-point'
import {
  executeWithAuth,
  makeRequestOption,
  makeRequestWithCustomer,
} from '../utils'

type Input = {
  isLogin?: boolean
  type: string
}

type Output = {
  user?: RankPoint
  list: RankPoint[]
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const path = `api/ranking/point`
  const option = makeRequestOption({
    method: 'get',
    queryString: {
      type: input.type,
    },
  })
  const request = makeRequestWithCustomer(path, option)
  const doAction = input.isLogin ? executeWithAuth : execute
  return await doAction(request, (json): Output => {
    const user = json.Me ? makeRankPoint(json.Me) : undefined
    const list = json.Rank.map((json: any) => {
      return makeRankPoint(json)
    })
    return {
      user,
      list,
    }
  })
}

export { action as getRankingPoint }
export type { Output as RankingPointResponse }

function newInstance(): Output {
  return {
    list: [],
  }
}
export { newInstance as newRankingPoint }
