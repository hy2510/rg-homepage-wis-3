import RenewType from '@/util/string-utils'

export interface SearchBook {
  topicTitle: string
  author: string
  levelName: string
  levelRoundId: string
  surfaceImagePath: string
  preferenceAverage: number
  rgPointCount: number
  rgPointSum: number
  totalCount: number
  addYn: boolean
  publisher: string
  seriesName: string
  addStudyCount: number
  sampleYn: boolean
  todayStudyYn: boolean
  levelRoundTitle: string
  levelRoundImage: string
  workSheetPath: string
  bookPoint: number
  iSBN: string
  animationPath: string
  newBookYn: boolean
  workBookPrintYn: boolean
  studentWorkSheetYn: boolean
  synopsis: string
  vocabularyPath: string
  studyImagePath: string
  recommendedAge: string
  gameLandRoundOpenYn: boolean
  getableRgPoint: number
}
export function makeSearchBook(json?: any): SearchBook {
  return {
    topicTitle: RenewType.renewString(json?.TopicTitle),
    author: RenewType.renewString(json?.Author),
    levelName: RenewType.renewString(json?.LevelName),
    levelRoundId: RenewType.renewString(json?.LevelRoundId),
    surfaceImagePath: RenewType.renewString(json?.SurfaceImagePath),
    preferenceAverage: RenewType.renewNumber(json?.PreferenceAverage),
    rgPointCount: RenewType.renewNumber(json?.RgPointCount),
    rgPointSum: RenewType.renewNumber(json?.RgPointSum),
    totalCount: RenewType.renewNumber(json?.TotalCount),
    addYn: RenewType.renewBoolean(json?.AddYn),
    publisher: RenewType.renewString(json?.Publisher),
    seriesName: RenewType.renewString(json?.SeriesName),
    addStudyCount: RenewType.renewNumber(json?.AddStudyCount),
    sampleYn: RenewType.renewBoolean(json?.SampleYn),
    todayStudyYn: RenewType.renewBoolean(json?.TodayStudyYn),
    levelRoundTitle: RenewType.renewString(json?.LevelRoundTitle),
    levelRoundImage: RenewType.renewString(json?.LevelRoundImage),
    workSheetPath: RenewType.renewString(json?.WorkSheetPath),
    bookPoint: json?.BookPoint
      ? Number(RenewType.renewNumber(json?.BookPoint).toFixed(2))
      : 0,
    iSBN: RenewType.renewString(json?.ISBN),
    animationPath: RenewType.renewString(json?.AnimationPath),
    newBookYn: RenewType.renewBoolean(json?.NewBookYn),
    workBookPrintYn: RenewType.renewBoolean(json?.WorkBookPrintYn),
    studentWorkSheetYn: RenewType.renewBoolean(json?.StudentWorkSheetYn),
    synopsis: RenewType.renewString(json?.Synopsis),
    vocabularyPath: RenewType.renewString(json?.VocabularyPath),
    studyImagePath: RenewType.renewString(json?.StudyImagePath),
    recommendedAge: RenewType.renewString(json?.RecommendedAge),
    gameLandRoundOpenYn: RenewType.renewBoolean(json?.GameLandRoundOpenYn),
    getableRgPoint: RenewType.renewNumber(json?.GetableRgPoint),
  }
}
