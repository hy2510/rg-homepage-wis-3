import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { LevelPoint, makeLevelUpStatus } from '../object/level-point'

type Input = {}

type Output = LevelPoint[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/level-point', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json.Point.map((item: any) => makeLevelUpStatus(item))
  })
}

export { action as getLevelPoint }
export type { Output as LevelPointResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newLevelPoint }
