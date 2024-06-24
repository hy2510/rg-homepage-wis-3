import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { HallOfFame, makeHallOfFame } from '../object/hall-of-fame'
import { executeWithAuth, makeRequestWithCustomer } from '../utils'

type Input = {
  isLogin?: boolean
}

type Output = {
  user?: HallOfFame
  list: HallOfFame[]
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/ranking/hall-of-fame', {
    method: 'get',
  })
  const doAction = input.isLogin ? executeWithAuth : execute
  return await doAction(request, (json): Output => {
    const user = json.Me ? makeHallOfFame(json.Me) : undefined
    const list = json.HallOfFame.map((json: any) => {
      return makeHallOfFame(json)
    })
    return {
      user,
      list,
    }
  })
}
export type { Output as HallOfFameResponse }

export { action as getHallOfFame }
function newInstance(): Output {
  return {
    list: [],
  }
}
export { newInstance as newHallOfFame }
