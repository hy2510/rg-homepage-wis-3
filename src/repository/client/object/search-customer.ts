import RenewType from '@/util/string-utils'

export interface SearchCustomer {
  name: string
  customerId: string
  homepageUrl: string
  customerUseCode: string
  logoFilename: string
  useStudentNoYn: boolean
  countryCode: string
}

export function makeSearchCustomer(json?: any): SearchCustomer {
  return {
    name: RenewType.renewString(json?.Name),
    customerId: RenewType.renewString(json?.CustomerId),
    homepageUrl: RenewType.renewString(json?.HomepageUrl),
    customerUseCode: RenewType.renewString(json?.CustomerUseCode),
    logoFilename: RenewType.renewString(json?.LogoFilename),
    useStudentNoYn: RenewType.renewBoolean(json?.UseStudentNoYn),
    countryCode: RenewType.renewString(json?.CountryCode),
  }
}
