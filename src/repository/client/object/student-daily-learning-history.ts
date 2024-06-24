import RenewType from '@/util/string-utils'
export interface StudentDailyLearningHistory { 
  iDX: string
  studentId: string
  settingLevelCode: string
  aimPoint: number
  settingBooks: number
  settingDate: string
  settingType: string
}

export function makeStudentDailyLearningHistory(json?: any): StudentDailyLearningHistory { 
  return { 
    iDX: RenewType.renewString(json?.IDX), 
    studentId: RenewType.renewString(json?.StudentId), 
    settingLevelCode: RenewType.renewString(json?.SettingLevelCode), 
    aimPoint: RenewType.renewNumber(json?.AimPoint), 
    settingBooks: RenewType.renewNumber(json?.SettingBooks), 
    settingDate: RenewType.renewString(json?.SettingDate), 
    settingType: RenewType.renewString(json?.SettingType), 
  }
}
