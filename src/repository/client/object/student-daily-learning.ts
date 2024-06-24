import RenewType from '@/util/string-utils'
export interface StudentDailyLearning {
  studentId: string
  settingLevelCode: string
  settingLevelName: string
  point: number
  books: number
  registDate: string
  orgRegistDate: string
  settingType: string
}

export function makeStudentDailyLearning(json?: any): StudentDailyLearning {
  return {
    studentId: RenewType.renewString(json?.StudentId),
    settingLevelCode: RenewType.renewString(json?.SettingLevelCode),
    settingLevelName: RenewType.renewString(json?.SettingLevelName),
    point: RenewType.renewNumber(json?.Point),
    books: RenewType.renewNumber(json?.Books),
    registDate: RenewType.renewString(json?.RegistDate),
    orgRegistDate: RenewType.renewString(json?.OrgRegistDate),
    settingType: RenewType.renewString(json?.SettingType),
  }
}
