import RenewType from '@/util/string-utils'

export interface SearchSeriesCategory {
  name: string
  code: string
  imagePath: string
  bookLevelMin: string
  bookLevelMax: string
  color: string
}
export function makeSearchSeriesCategory(json?: any): SearchSeriesCategory {
  return {
    name: RenewType.renewString(json?.Name),
    code: RenewType.renewString(json?.Code),
    imagePath: RenewType.renewString(json?.ImagePath),
    bookLevelMin: RenewType.renewString(json?.BookLevelMin),
    bookLevelMax: RenewType.renewString(json?.BookLevelMax),
    color: RenewType.renewString(json?.Color),
  }
}
