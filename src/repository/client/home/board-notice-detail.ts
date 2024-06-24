import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { BoardNotice, makeBoardNotice } from '../object/board-notice'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  notifyId: string
}

type Output = BoardNotice

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/home/notice/' + `${input.notifyId}`,
    {
      method: 'get',
    },
  )
  return await execute(request, (json): Output => {
    return makeBoardNotice(json.Detail)
  })
}
export type { Output as BoardNoticeResponse }

function newInstance(): Output {
  return makeBoardNotice()
}
export { action as getBoardNotice, newInstance as newBoardNotice }
