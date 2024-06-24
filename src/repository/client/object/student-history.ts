import RenewType from '@/util/string-utils'
export interface StudentHistory {
  studentHistoryId: string
  studentId: string
  classGroupId: string
  classGroupName: string
  classId: string
  className: string
  classFee: number
  fee: number
  discount: number
  discountCode: string
  startDate: string
  endDate: string
  fromClassId: string
  toClassId: string
  classMoveCancelYn: boolean
  studyYn: boolean
  receiptYn: boolean
  firstStudyDate: string
  lastStudyDate: string
  registDate: string
  registStaffId: string
  registStaffName: string
  modifyDate: string
  modifyStaffId: string
  modifyStaffName: string
}
export function makeStudentHistory(json?: any): StudentHistory {
  return {
    studentHistoryId: RenewType.renewString(json?.StudentHistoryId),
    studentId: RenewType.renewString(json?.StudentId),
    classGroupId: RenewType.renewString(json?.ClassGroupId),
    classGroupName: RenewType.renewString(json?.ClassGroupName),
    classId: RenewType.renewString(json?.ClassId),
    className: RenewType.renewString(json?.ClassName),
    classFee: RenewType.renewNumber(json?.ClassFee),
    fee: RenewType.renewNumber(json?.Fee),
    discount: RenewType.renewNumber(json?.Discount),
    discountCode: RenewType.renewString(json?.DiscountCode),
    startDate: RenewType.renewString(json?.StartDate),
    endDate: RenewType.renewString(json?.EndDate),
    fromClassId: RenewType.renewString(json?.FromClassId),
    toClassId: RenewType.renewString(json?.ToClassId),
    classMoveCancelYn: RenewType.renewBoolean(json?.ClassMoveCancelYn),
    studyYn: RenewType.renewBoolean(json?.StudyYn),
    receiptYn: RenewType.renewBoolean(json?.ReceiptYn),
    firstStudyDate: RenewType.renewString(json?.FirstStudyDate),
    lastStudyDate: RenewType.renewString(json?.LastStudyDate),
    registDate: RenewType.renewString(json?.RegistDate),
    registStaffId: RenewType.renewString(json?.RegistStaffId),
    registStaffName: RenewType.renewString(json?.RegistStaffName),
    modifyDate: RenewType.renewString(json?.ModifyDate),
    modifyStaffId: RenewType.renewString(json?.ModifyStaffId),
    modifyStaffName: RenewType.renewString(json?.ModifyStaffName),
  }
}
