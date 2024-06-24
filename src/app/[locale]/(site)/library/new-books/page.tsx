'use client'

import SITE_PATH from '@/app/site-path'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useOnLoadLibraryNewBook } from '@/client/store/library/new-book/hook'
import { useLibraryNewBook } from '@/client/store/library/new-book/selector'
import {
  useStudentHistory,
  useStudentHistoryAction,
} from '@/client/store/student/history/selector'
import { BackLink } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { BookCover } from '@/ui/modules/library-book-cover/book-cover'

const STYLE_ID = 'page_new_books'

export default function Page() {
  const params = useSearchParams()

  const keyword = params.get('keyword') || ''

  const { loading } = useOnLoadLibraryNewBook()

  if (loading) {
    return <LoadingScreen />
  }

  return <NewBookLayout keyword={keyword} />
}

function NewBookLayout({ keyword }: { keyword: string }) {
  const style = useStyle(STYLE_ID)

  const { option, payload: newbook } = useLibraryNewBook()

  const eBookCount = newbook.EB.length
  const pBookCount = newbook.PB.length

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
    <main className={style.search_result}>
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        {`${option.year}. ${option.month} New Books`}
      </BackLink>
      {/* <Dropdown title={`${option.year}. ${option.month}`}>
        <DropdownItem> {`${option.year}. ${option.month}`}</DropdownItem>
      </Dropdown> */}

      {eBookCount > 0 && (
        <div className={style.row_a}>
          <div className={style.txt_h}>eBook({eBookCount})</div>
          <div className={style.book_list}>
            {newbook.EB.map((book, i) => {
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
          </div>
        </div>
      )}

      {pBookCount > 0 && (
        <div className={style.row_a}>
          <div className={style.txt_h}>pBook Quiz({pBookCount})</div>
          <div className={style.book_list}>
            {newbook.PB.map((book, i) => {
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
          </div>
        </div>
      )}
    </main>
  )
}
