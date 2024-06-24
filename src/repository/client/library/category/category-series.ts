import { ApiResponse } from '@/http/common/response'
import {
  SearchSeriesCategory,
  makeSearchSeriesCategory,
} from '../../object/search-series-category'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {
  bookType: string
  level: string
}

type Output = SearchSeriesCategory[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/library/category/series`, {
    method: 'get',
    queryString: {
      bookType: input.bookType,
      level: input.level,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return json.Category.map((item: any) => makeSearchSeriesCategory(item))
  })
}

export { action as getCategorySeries }
export type { Output as CategorySeriesResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newCategorySeries }
