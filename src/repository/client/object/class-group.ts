import RenewType from '@/util/string-utils'

export interface ClassGroup {
  classGroupId: string
  name: string
  feeTypeCode: string
  feeTypeName: string
  fee: number
  memo: string
  hiddenYn: boolean
  registStaffId: string
  registStaffName: string
  registDate: string
  modifyStaffId: string
  modifyStaffName: string
  modifyDate: string
}

export function makeClassGroup(json?: any): ClassGroup {
  return {
    classGroupId: RenewType.renewString(json?.ClassGroupId),
    name: RenewType.renewString(json?.Name),
    feeTypeCode: RenewType.renewString(json?.FeeTypeCode),
    feeTypeName: RenewType.renewString(json?.FeeTypeName),
    fee: RenewType.renewNumber(json?.Fee),
    memo: RenewType.renewString(json?.memo),
    hiddenYn: RenewType.renewBoolean(json?.HiddenYn),
    registStaffId: RenewType.renewString(json?.RegistStaffId),
    registStaffName: RenewType.renewString(json?.RegistStaffName),
    registDate: RenewType.renewString(json?.RegistDate),
    modifyStaffId: RenewType.renewString(json?.ModifyStaffId),
    modifyStaffName: RenewType.renewString(json?.ModifyStaffName),
    modifyDate: RenewType.renewString(json?.ModifyDate),
  }
}
