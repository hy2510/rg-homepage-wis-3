import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  BoardNoticeList,
  makeBoardNoticeList,
} from '../object/board-notice-list'
import { makeRequestWithCustomer } from '../utils'

type Input = {}

type Output = {
  board: BoardNoticeList[]
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/home/notice-main', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return {
      board: json.Board.map(
        (item: any): BoardNoticeList => makeBoardNoticeList(item),
      ),
    }
  })
}

export type { Output as BoardNoticeMainResponse }

function newInstance(): Output {
  return {
    board: [],
  }
}
export { action as getBoardNoticeMain }
