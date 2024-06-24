import { ApiResponse } from '@/http/common/response'
import { SearchBook, makeSearchBook } from '../../object/search-book'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {
  bookType: string
  keyword: string
  page: number
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
  keyword,
  page = 1,
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/keyword?bookType=${bookType}&searchText=${keyword}&page=${page}`,
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

export { action as getSearchKeywordBook }
export type { Output as SearchKeywordBookResponse }

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
