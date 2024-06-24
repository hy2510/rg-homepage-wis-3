import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { LevelMaster, makeLevelMaster } from '../object/level-master'
import { makeRequestWithCustomer } from '../utils'

type Input = {}

type Output = { list: LevelMaster[] }

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/ranking/level-master', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return { list: json.Rank.map((item: any) => makeLevelMaster(item)) }
  })
}
export type { Output as LevelMasterBoardResponse }

export { action as getLevelMasterBoard }
function newInstance(): Output {
  return {
    list: [],
  }
}
export { newInstance as newLevelMasterBoard }
