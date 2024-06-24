import RenewType from '@/util/string-utils'

export interface SearchThemeCategory {
  name: string
  code: string
  imagePath: string
}
export function makeSearchThemeCategory(json?: any): SearchThemeCategory {
  return {
    name: RenewType.renewString(json?.Name),
    code: RenewType.renewString(json?.Code),
    imagePath: RenewType.renewString(json?.ImagePath),
  }
}
