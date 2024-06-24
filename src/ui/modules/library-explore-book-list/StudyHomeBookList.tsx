import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import {
  useStudentHistory,
  useStudentHistoryAction,
} from '@/client/store/student/history/selector'
import { SearchLevelBookResponse } from '@/repository/client/library/search/search-level'
import { BookCover } from '../library-book-cover/book-cover'
import { LibraryFilterOption } from '../library-set-fliter/LibrarySearchFilter'
import { BookList } from './book-list'

// 학습메인 > 사용자의 학습레벨의 도서 리스트
export function StudyHomeBookList({
  completeCount = 0,
  totalCount = 0,
  books,
  filterOption,
  bookType,
  onChangeFilterOption,
}: {
  completeCount?: number
  totalCount?: number
  books: SearchLevelBookResponse
  filterOption: LibraryFilterOption[]
  bookType: string
  onChangeFilterOption?: (filterOption: LibraryFilterOption[]) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const studentHistoryAction = useStudentHistoryAction()
  const studentHistoryList = useStudentHistory().payload.map((history) => ({
    studentHistoryId: history.studentHistoryId,
    classId: history.classId,
    className: history.className,
  }))
  const studentHistoryId = useStudentHistory().defaultHistoryId
  const onSelectStudentHistoryId = (studentHistoryId: string) => {
    studentHistoryAction.setDefaultHistoryId(studentHistoryId)
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  return (
    <>
      <BookList
        value={completeCount}
        max={totalCount}
        title={t('t493')}
        alertMessage={bookType === 'EB' ? t('t494') : t('t495')}
        filterOption={filterOption}
        onChangeFilterOption={onChangeFilterOption}
        bookCount={books.page.totalRecords}>
        {books.book.map((book, i) => {
          const earnPoint = book.getableRgPoint
          const bookCode = book.levelName
          return (
            <BookCover
              key={`book-cover-${i}-${book.surfaceImagePath}`}
              id={book.levelRoundId}
              target={`library`}
              bookImgSrc={book.surfaceImagePath}
              bookCode={bookCode}
              earnPoint={earnPoint}
              title={book.topicTitle}
              author={book.author}
              isBookInfo={bookInfo === book.levelRoundId}
              passedCount={book.rgPointCount}
              isMovieBook={!!book.animationPath}
              isAssignedTodo={!book.addYn}
              onClickBookDetail={() => {
                setBookInfo(bookInfo ? undefined : book.levelRoundId)
              }}
              levelRoundId={book.levelRoundId}
              studentHistoryId={studentHistoryId}
              studentHistoryList={studentHistoryList}
              onSelectStudentHistoryId={onSelectStudentHistoryId}
            />
          )
        })}
      </BookList>
    </>
  )
}
