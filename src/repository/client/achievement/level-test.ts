import { LevelTest, makeLevelTest } from '../object/level-test'
import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {}

type Output = LevelTest[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/level-test', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json.LevelTest.map((item: any) => makeLevelTest(item))
  })
}

export { action as getLevelTest }
export type { Output as LevelTestResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newLevelTest }
