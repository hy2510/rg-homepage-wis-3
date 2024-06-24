'use client'

import { useLoadedAchieveLevelBooks } from '@/client/store/achieve/level-books/selector'
import { useLoadedStudentDailyLearning } from '@/client/store/student/daily-learning/selector'
import { useScreenMode } from '@/ui/context/StyleContext'
import BookSearchBar from '@/ui/modules/library-book-search-bar/BookSearchBar'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const isPC = useScreenMode() === 'pc'

  const isDailyLearningLoading = !useLoadedStudentDailyLearning()
  const isAchieveLevelLoading = !useLoadedAchieveLevelBooks()
  if (isDailyLearningLoading || isAchieveLevelLoading) {
    return <></>
  }

  return (
    <div className="container compact">
      {isPC && <BookSearchBar />}
      {children}
    </div>
  )
}
