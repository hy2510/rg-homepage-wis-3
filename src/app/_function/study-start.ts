import SITE_PATH from '../site-path'

type StudyStartInfo = {
  studyId: string
  studentHistoryId: string
  bookCode: string
  levelRoundId: string
  bookLevel: string
}
type StudyRef = {
  StudyId: string
  StudentHistoryId: string
  LevelName: string
  LevelRoundId: string
  User: string
  Mode: 'quiz' | 'review' | 'super'
  BookType: 'EB' | 'PB' | 'PK' | 'DODO'
  level: string
  isStartSpeak?: boolean
  referer?: string
}
export function goToStudy({
  studyInfo,
  user = 'student',
  mode = 'quiz',
  isStartSpeak = false,
}: {
  studyInfo: StudyStartInfo
  user?: 'student' | 'staff'
  mode?: 'quiz' | 'review'
  isStartSpeak?: boolean
}) {
  const LevelName = studyInfo.bookCode
  let bookTypeTmp = undefined
  const isPK = LevelName.startsWith('EB-PK')
  const bookRound = Number(LevelName.substring(6))
  if (isPK) {
    if (bookRound < 300) {
      bookTypeTmp = 'PK'
    } else {
      bookTypeTmp = 'DODO'
    }
  } else if (LevelName.startsWith('EB')) {
    bookTypeTmp = 'EB'
  } else if (LevelName.startsWith('PB')) {
    bookTypeTmp = 'PB'
  }
  if (!bookTypeTmp) {
    throw Error('BookType Mismatch')
  }

  const BookType = bookTypeTmp as 'EB' | 'PB' | 'PK' | 'DODO'
  const referer =
    mode === 'quiz' ? SITE_PATH.LIBRARY.HOME : SITE_PATH.REVIEW.SIMPLE

  const ref: StudyRef = {
    StudyId: studyInfo.studyId,
    StudentHistoryId: studyInfo.studentHistoryId,
    LevelName,
    LevelRoundId: studyInfo.levelRoundId,
    BookType,
    User: user,
    Mode: mode,
    level: studyInfo.bookLevel,
    isStartSpeak: isStartSpeak,
    referer: referer,
  }
  const signedRef = encodeURIComponent(btoa(JSON.stringify(ref)))
  if (window && window.location) {
    window.location.href = '/study/start.html?REF=' + signedRef
  }
}

export function goToLevelTest(info?: { user?: string }) {
  const ref = {
    BookType: 'LEVELTEST',
    User: info?.user || 'student',
    Mode: 'quiz',
    referer: SITE_PATH.LIBRARY.HOME,
  }
  const signedRef = encodeURIComponent(btoa(JSON.stringify(ref)))
  if (window && window.location) {
    window.location.href = '/study/start.html?REF=' + signedRef
  }
}
