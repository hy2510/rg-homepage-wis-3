import { ApiResponse } from '@/http/common/response'
import { SearchBook, makeSearchBook } from '../../object/search-book'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {
  bookType: string
  level: string
  page?: number
  sort?: string
  genre?: string
  status?: string
}

type Output = {
  book: SearchBook[]
  page: {
    page: number
    size: number
    totalPages: number
    totalRecords: number
  }
  download?: string
}

async function action({
  bookType,
  level,
  page = 1,
  sort = '',
  genre = '',
  status = '',
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/level?bookType=${bookType}&level=${level}&sort=${sort}&genre=${genre}&status=${status}&page=${page}`,
    {
      method: 'get',
    },
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
      download: json.ExcelDownload,
    }
  })
}

export { action as getSearchLevelBook }
export type { Output as SearchLevelBookResponse }

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
export { newInstance as newSearchLevel }
