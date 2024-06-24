import RenewType from '@/util/string-utils'

export interface ForgotIdWithClassAndStudentName {
  loginId: string
  studentName: string
  code: number
}

export function makeForgotIdWithClassAndStudentName(
  json?: any,
): ForgotIdWithClassAndStudentName {
  return {
    loginId: RenewType.renewString(json?.loginId),
    studentName: RenewType.renewString(json?.studentName),
    code: RenewType.renewNumber(json?.code),
  }
}
