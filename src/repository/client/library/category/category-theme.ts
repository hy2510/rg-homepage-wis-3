import { ApiResponse } from '@/http/common/response'
import {
  SearchThemeCategory,
  makeSearchThemeCategory,
} from '../../object/search-theme-category'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {
  bookType: string
  level: string
}

type Output = SearchThemeCategory[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/library/category/theme`, {
    method: 'get',
    queryString: {
      bookType: input.bookType,
      level: input.level,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return json.Category.map((item: any) => makeSearchThemeCategory(item))
  })
}

export { action as getCategoryTheme }
export type { Output as CategoryThemeResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newCategoryTheme }
