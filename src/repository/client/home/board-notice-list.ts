import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  BoardNoticeList,
  makeBoardNoticeList,
} from '../object/board-notice-list'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  page: number
}

type Output = {
  board: BoardNoticeList[]
  page: {
    page: number
    size: number
    totalPages: number
    totalRecords: number
  }
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/home/notice', {
    method: 'get',
    queryString: {
      page: input.page,
    },
  })
  return await execute(request, (json): Output => {
    return {
      board: json.Board.map(
        (item: any): BoardNoticeList => makeBoardNoticeList(item),
      ),
      page: {
        page: Number(json.Pagination.Page),
        size: Number(json.Pagination.RecordPerPage),
        totalPages: Number(json.Pagination.TotalPages),
        totalRecords: Number(json.Pagination.TotalRecords),
      },
    }
  })
}
export type { Output as BoardNoticeListResponse }

function newInstance(): Output {
  return {
    board: [],
    page: {
      page: 0,
      size: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  }
}
export { action as getBoardNoticeList, newInstance as newBoardNoticeList }
