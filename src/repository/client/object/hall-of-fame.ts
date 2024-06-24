import RenewType from '@/util/string-utils'

export interface HallOfFame {
  no: number
  hallOfFameId: string
  studentId: string
  studentName: string
  customerName: string
  gradeName: string
  rgPoint: number
  bookCount: number
  hallOfFameGrade: string
  registDate: string
}

export function makeHallOfFame(json?: any): HallOfFame {
  return {
    no: RenewType.renewNumber(json?.No),
    hallOfFameId: RenewType.renewString(json?.HallOfFameId),
    studentId: RenewType.renewString(json?.StudentId),
    studentName: RenewType.renewString(json?.StudentName),
    customerName: RenewType.renewString(json?.CustomerName),
    gradeName: RenewType.renewString(json?.GradeName),
    rgPoint: RenewType.renewNumber(json?.RgPoint),
    bookCount: RenewType.renewNumber(json?.BookCount),
    hallOfFameGrade: RenewType.renewString(json?.HallOfFameGrade),
    registDate: RenewType.renewString(json?.RegistDate),
  }
}
