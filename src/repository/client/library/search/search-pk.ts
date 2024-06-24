import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'
import { SearchBook, makeSearchBook } from '../../object/search-book'

type Input = {
  activity: string
  status?: string
  page?: number
}

type Output = {
  book: SearchBook[]
  page: {
    page: number
    size: number
    totalPages: number
    totalRecords: number
  }
}

async function action({
  activity,
  status = 'All',
  page = 1,
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/pre-k?activity=${activity}&status=${status}&page=${page}`,
    {
      method: 'get',
    }
  )
  return await executeWithAuth(request, (json): Output => {
    return {
      book: json.Books.map((item: any) => makeSearchBook(item)),
      page: {
        page: Number(json.Pagination.Page),
        size: Number(json.Pagination.RecordPerPage),
        totalPages: Number(json.Pagination.TotalPages),
        totalRecords: Number(json.Pagination.TotalRecords),
      },
    }
  })
}

export { action as getSearchPreKBook }
export type { Output as SearchPreKBookResponse }

function newInstance(): Output {
  return {
    book: [],
    page: {
      page: 0,
      size: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  }
}
export { newInstance as newSearchPK }
