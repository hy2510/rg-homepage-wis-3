import RenewType from '@/util/string-utils'

export interface ForgotId {
  loginId: string
  studentName: string
  registDate: string
}

export function makeForgotId(json?: any): ForgotId {
  return {
    loginId: RenewType.renewString(json?.LoginId),
    studentName: RenewType.renewString(json?.StudentName),
    registDate: RenewType.renewString(json?.RegistDate),
  }
}
