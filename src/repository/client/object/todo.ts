import RenewType from '@/util/string-utils'

export interface Todo {
  bookId: string
  studyId: string
  studentHistoryId: string
  levelRoundId: string
  classId: string
  className: string
  levelName: string
  title: string
  assignDate: string
  openDate: string
  dueDate: string
  scoreStep1: number
  scoreStep2: number
  scoreStep3: number
  scoreStep4: number
  scoreStep5: number
  deleteYn: boolean
  surfaceImagePath: string
  theme: string
  seriesName: string
  rgPointCount: number
  first_step: string
  first_quiz_id: string
  revisionYn: string
  fullEasyMode: string
  storySoundPath: string
  bookPoint: number
  author: string
  preferenceAverage: number
  publisher: string
  iSBN: string
  animationPath: string
  oldBookCode: string
  easyRgPoint: number
  statusCode: string
  answerCount: number
  homeworkYn: boolean
  recommendedAge: string
}

export function makeTodo(json?: any): Todo {
  return {
    bookId: RenewType.renewString(json?.BookId),
    studyId: RenewType.renewString(json?.StudyId),
    studentHistoryId: RenewType.renewString(json?.StudentHistoryId),
    levelRoundId: RenewType.renewString(json?.LevelRoundId),
    classId: RenewType.renewString(json?.ClassId),
    className: RenewType.renewString(json?.ClassName),
    levelName: RenewType.renewString(json?.LevelName),
    title: RenewType.renewString(json?.Title),
    assignDate: RenewType.renewString(json?.AssignDate),
    openDate: RenewType.renewString(json?.OpenDate),
    dueDate: RenewType.renewString(json?.DueDate),
    scoreStep1: RenewType.renewNumber(json?.ScoreStep1),
    scoreStep2: RenewType.renewNumber(json?.ScoreStep2),
    scoreStep3: RenewType.renewNumber(json?.ScoreStep3),
    scoreStep4: RenewType.renewNumber(json?.ScoreStep4),
    scoreStep5: RenewType.renewNumber(json?.ScoreStep5),
    deleteYn: RenewType.renewBoolean(json?.DeleteYn),
    surfaceImagePath: RenewType.renewString(json?.SurfaceImagePath),
    theme: RenewType.renewString(json?.Theme),
    seriesName: RenewType.renewString(json?.SeriesName),
    rgPointCount: RenewType.renewNumber(json?.RgPointCount),
    first_step: RenewType.renewString(json?.first_step),
    first_quiz_id: RenewType.renewString(json?.first_quiz_id),
    revisionYn: RenewType.renewString(json?.RevisionYn),
    fullEasyMode: RenewType.renewString(json?.FullEasyMode),
    storySoundPath: RenewType.renewString(json?.StorySoundPath),
    bookPoint: RenewType.renewNumber(json?.BookPoint),
    author: RenewType.renewString(json?.Author),
    preferenceAverage: RenewType.renewNumber(json?.PreferenceAverage),
    publisher: RenewType.renewString(json?.Publisher),
    iSBN: RenewType.renewString(json?.ISBN),
    animationPath: RenewType.renewString(json?.AnimationPath),
    oldBookCode: RenewType.renewString(json?.OldBookCode),
    easyRgPoint: RenewType.renewNumber(json?.EasyRgPoint),
    statusCode: RenewType.renewString(json?.StatusCode),
    answerCount: RenewType.renewNumber(json?.AnswerCount),
    homeworkYn: json?.RegistId && json?.RegistId !== json?.StudentId,
    recommendedAge: RenewType.renewString(json?.RecommendedAge),
  }
}
