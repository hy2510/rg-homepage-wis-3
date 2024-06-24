import RenewType from '@/util/string-utils'

export interface LevelMaster {
  no: number
  levelHistoryId: string
  levelDate: string
  studentId: string
  studentName: string
  studentName2: string
  loginId: string
  loginId2: string
  className: string
  schoolId: string
  gradeCode: string
  schoolName: string
  levelCode: string
  levelName: string
  rgPoint: string
  books: string
  reason: string
  changerName: string
  showCertBtnYn: string
  imgAvatarList: string
  avatarId: string
  imgRankingList2: string
  sortOrder: string
  levelUpCertificate: string
  masterLevelName: string
  certificationPath: string
}
export function makeLevelMaster(json?: any): LevelMaster {
  return {
    no: RenewType.renewNumber(json?.No),
    levelHistoryId: RenewType.renewString(json?.LevelHistoryId),
    levelDate: RenewType.renewString(json?.LevelDate),
    studentId: RenewType.renewString(json?.StudentId),
    studentName: RenewType.renewString(json?.StudentName),
    studentName2: RenewType.renewString(json?.StudentName2),
    loginId: RenewType.renewString(json?.LoginId),
    loginId2: RenewType.renewString(json?.LoginId2),
    className: RenewType.renewString(json?.ClassName),
    schoolId: RenewType.renewString(json?.SchoolId),
    gradeCode: RenewType.renewString(json?.GradeCode),
    schoolName: RenewType.renewString(json?.SchoolName),
    levelCode: RenewType.renewString(json?.LevelCode),
    levelName: RenewType.renewString(json?.LevelName),
    rgPoint: RenewType.renewString(json?.RgPoint),
    books: RenewType.renewString(json?.Books),
    reason: RenewType.renewString(json?.Reason),
    changerName: RenewType.renewString(json?.ChangerName),
    showCertBtnYn: RenewType.renewString(json?.ShowCertBtnYn),
    imgAvatarList: RenewType.renewString(json?.ImgAvatarList),
    avatarId: RenewType.renewString(json?.AvatarId),
    sortOrder: RenewType.renewString(json?.SortOrder),
    imgRankingList2: RenewType.renewString(json?.ImgRankingList2),
    levelUpCertificate: RenewType.renewString(json?.LevelUpCertificate),
    masterLevelName: RenewType.renewString(json?.MasterLevelName),
    certificationPath: RenewType.renewString(json?.CertificationPath),
  }
}
