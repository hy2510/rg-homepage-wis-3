import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { LevelMaster, makeLevelMaster } from '../object/level-master'

type Input = {}

type Output = LevelMaster[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/level-master', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json.LevelMaster.map((item: any) => makeLevelMaster(item))
  })
}

export { action as getLevelMaster }
export type { Output as LevelMasterResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newLevelMaster }
